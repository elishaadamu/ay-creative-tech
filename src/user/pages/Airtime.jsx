import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Card } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { config } from "../../config/config";
import CryptoJS from "crypto-js";

function AirtimeSub() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [account, setAccount] = useState(null);

  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

  const decryptData = (ciphertext) => {
    if (!ciphertext) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const encryptedUser = localStorage.getItem("user");
        if (encryptedUser) {
          const userData = decryptData(encryptedUser);
          if (userData) {
            const userId = userData._id || userData.id;

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
  const onFinish = async (values) => {
    const amount = Number(values.amount);

    if (isNaN(amount) || amount < 50) {
      toast.error("Minimum airtime amount is ₦50!");
      return;
    }

    if (amount > (account?.balance || 0)) {
      toast.error("Insufficient balance!");
      return;
    }

    setLoading(true);
    try {
      const encryptedUser = localStorage.getItem("user");
      const userData = decryptData(encryptedUser);
      const userId = userData?._id || userData?.id;

      if (!userId) {
        toast.error("Please login to continue");
        return;
      }

      const payload = {
        network: values.network.toUpperCase(),
        phone: values.phoneNumber,
        userId: userId,
        amount: amount,
        pin: values.transactionPin,
        plan_type: values.plan_type, // Add the selected plan_type
      };
      console.log("Transaction payload:", payload);

      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.airtimeSubscription}`,
        payload
      );

      if (response.data.success) {
        toast.success("Airtime purchase successful!");

        // Refresh account balance
        const accountResponse = await axios.get(
          `${config.apiBaseUrl}/virtualAccount/${userId}`
        );
        setAccount(accountResponse.data);

        form.resetFields();
      } else {
        toast.error(response.data.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error(
        error.response?.data?.message || "Transaction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Airtime Purchase</span>
            <span className="text-green-600 font-semibold">
              Balance:{" "}
              {loadingAccount
                ? "Loading..."
                : `₦${account?.balance?.toFixed(2) || "0.00"}`}
            </span>
          </div>
        }
        className="shadow-md rounded-lg"
        style={{ maxWidth: 600, margin: "0 auto", marginTop: 32 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // Remove initialValues
          // initialValues={{ network: "mtn" }}
        >
          <Form.Item
            name="network"
            label="Select Network"
            // Remove initialValue="Network"
            rules={[{ required: true, message: "Please select a network!" }]}
          >
            <Select placeholder="Select network" size="large">
              <Select.Option value="mtn">MTN</Select.Option>
              <Select.Option value="airtel">AIRTEL</Select.Option>
              <Select.Option value="glo">GLO</Select.Option>
              <Select.Option value="9mobile">9MOBILE</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className=""
            name="plan_type"
            label="Plan Type"
            rules={[{ required: true, message: "Please select a plan type!" }]}
          >
            <Select placeholder="Select plan type" size="large">
              <Select.Option value="VTU">VTU</Select.Option>
              <Select.Option disabled value="SHARE">
                SHARE
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: "Please enter amount!" },
              {
                validator: async (_, value) => {
                  if (!value) {
                    return Promise.reject("Please enter amount!");
                  }
                  const numValue = Number(value);
                  if (isNaN(numValue)) {
                    return Promise.reject("Please enter a valid number!");
                  }
                  if (numValue < 50) {
                    return Promise.reject("Minimum amount is ₦50!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter amount"
              size="large"
              min={50}
              prefix="₦"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
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
            rules={[
              { required: true, message: "Please input your transaction PIN!" },
              { len: 4, message: "PIN must be 4 digits!" },
            ]}
          >
            <Input.Password
              placeholder="Enter 4-digit PIN"
              maxLength={4}
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
              {loading ? "Processing..." : "Purchase Airtime"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default AirtimeSub;
