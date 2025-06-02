import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Card } from "antd";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config/config.jsx";
import { useNavigate } from "react-router-dom";

function DataSub() {
  const [form] = Form.useForm();
  const [dataPlans, setDataPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [networkPlans, setNetworkPlans] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedPlanType, setSelectedPlanType] = useState(null);
  const navigate = useNavigate();

  // Add secret key for decryption
  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

  // Add decryption function
  function decryptData(ciphertext) {
    if (!ciphertext) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const encryptedUser = localStorage.getItem("user");
        if (encryptedUser) {
          const userData = decryptData(encryptedUser);
          if (userData) {
            const userId = userData._id || userData.id;

            // Fetch account info
            try {
              const response = await axios.get(
                `${config.apiBaseUrl}/virtualAccount/${userId}`
              );
              setAccount(response.data);
            } catch (error) {
              console.error("Error fetching account:", error);
              toast.error("Could not fetch account details");
            }
          }
        } else {
          toast.error("Please login to continue");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      } finally {
        setLoadingAccount(false);
      }
    };

    fetchUserData();
  }, []);

  // Add new useEffect for fetching data plans
  useEffect(() => {
    const fetchDataPlans = async () => {
      if (selectedNetwork && selectedPlanType === "gifting") {
        try {
          const serviceIDMap = {
            mtn: "mtn-data",
            glo: "glo-data",
            airtel: "airtel-data",
            "9mobile": "etisalat-data",
          };

          const serviceID = serviceIDMap[selectedNetwork];

          const response = await axios.get(
            "https://vtpass.com/api/service-variations",
            {
              params: { serviceID },
            }
          );

          if (response.data && response.data.content) {
            setNetworkPlans(response.data.content.variations);
          }
        } catch (error) {
          toast.error("Could not fetch data plans");
          setNetworkPlans([]);
        }
      } else {
        setNetworkPlans([]);
      }
    };

    fetchDataPlans();
  }, [selectedNetwork, selectedPlanType]);

  // Add handlers for network and plan type selection
  const handleNetworkChange = (value) => {
    setSelectedNetwork(value);
    form.setFieldsValue({ dataplan: undefined }); // Reset data plan selection
  };

  const handlePlanTypeChange = (value) => {
    setSelectedPlanType(value);
    form.setFieldsValue({ dataplan: undefined }); // Reset data plan selection
  };

  const onFinish = async (values) => {
    try {
      // Get data plan price based on selection
      const planPrice = 1000; // Replace with actual plan price logic

      if (!account || account.balance < planPrice) {
        toast.error("Insufficient balance. Please fund your wallet.");
        return;
      }

      const payload = {
        userId: userData._id,
        network: values.network,
        planType: values.planType,
        dataplan: values.dataplan,
        phoneNumber: values.phoneNumber,
        amount: planPrice,
        transactionPin: values.transactionPin,
      };

      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.buyData}`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Data purchase successful!");
        // Update user balance
        setAccount((prevAccount) => ({
          ...prevAccount,
          balance: prevAccount.balance - planPrice,
        }));
      } else {
        toast.error(response.data.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error(error.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  // Add PIN check effect
  useEffect(() => {
    const checkPin = () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const userObj = decryptData(userStr);
          if (!userObj?.hasPin) {
            toast.info("Please set your transaction PIN first!", {
              position: "top-right",
              autoClose: 2000,
            });

            setTimeout(() => {
              navigate("/dashboard/setpin", {
                state: {
                  returnPath: "/data",
                },
              });
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error checking PIN status:", error);
      }
    };

    checkPin();
  }, [navigate]);

  return (
    <div>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Data Subscription</span>
            <span className="text-green-600 font-semibold">
              Balance: ₦{account ? account.balance.toFixed(2) : "0.00"}
            </span>
          </div>
        }
        className="mx-auto max-w-[100%] md:max-w-[80%] lg:max-w-[80%] xl:max-w-[80%] 2xl:max-w-[60%] p-0"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="network"
            label="Network Provider"
            rules={[{ required: true, message: "Please select a network!" }]}
          >
            <Select
              placeholder="Select network"
              size="large"
              onChange={handleNetworkChange}
            >
              <Select.Option value="mtn">MTN</Select.Option>
              <Select.Option value="airtel">Airtel</Select.Option>
              <Select.Option value="glo">Glo</Select.Option>
              <Select.Option value="9mobile">9Mobile</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="planType"
            label="Plan Type"
            rules={[{ required: true, message: "Please select a plan type!" }]}
          >
            <Select
              placeholder="Select plan type"
              size="large"
              onChange={handlePlanTypeChange}
            >
              <Select.Option value="sme">SME</Select.Option>
              <Select.Option value="corporate">Corporate</Select.Option>
              <Select.Option value="gifting">Direct</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dataplan"
            label="Data Plan"
            rules={[{ required: true, message: "Please select a data plan!" }]}
          >
            <Select
              placeholder="Select data plan"
              size="large"
              disabled={!networkPlans.length}
            >
              {networkPlans.map((plan) => (
                <Select.Option
                  key={plan.variation_code}
                  value={plan.variation_code}
                >
                  {plan.name} - ₦{plan.variation_amount}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            autoComplete="off"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { len: 11, message: "Phone number must be 11 digits!" },
            ]}
          >
            <Input
              placeholder="Enter phone number"
              maxLength={11}
              size="large"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="transactionPin"
            label="Transaction PIN"
            autoComplete="off"
            rules={[
              { required: true, message: "Please input your transaction PIN!" },
              { len: 6, message: "PIN must be 6 digits!" },
            ]}
          >
            <Input.Password
              placeholder="Enter 6-digit PIN"
              maxLength={6}
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="shadow-2xl"
              loading={loading}
            >
              {loading ? "Processing..." : "Subscribe"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default DataSub;
