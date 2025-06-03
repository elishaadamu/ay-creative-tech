import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Card } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchDataPlans } from "../services/DataPlanService";
import axios from "axios";
import { config } from "../../config/config";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

function DataSub() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [allPlans, setAllPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
    const initialize = async () => {
      try {
        // Fetch data plans
        const plans = await fetchDataPlans();
        setAllPlans(plans);

        // Fetch user account details
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
        console.error("Error initializing:", error);
        toast.error("Error loading data");
      } finally {
        setLoadingAccount(false);
      }
    };

    initialize();
  }, []);

  // Add this network mapping constant at the top of your component
  const networkMapping = {
    1: "MTN",
    2: "AIRTEL",
    3: "GLO",
    4: "9MOBILE",
  };

  // Handle network selection
  const handleNetworkChange = (value) => {
    form.setFieldsValue({ planType: undefined, dataplan: undefined });
    const network = networkMapping[value];
    const filtered = allPlans.filter((plan) => plan.network === network);
    setFilteredPlans(filtered);
    setSelectedPlan(null);
  };

  // Handle plan type selection
  const handlePlanTypeChange = (value) => {
    form.setFieldsValue({ dataplan: undefined });
    const network = networkMapping[form.getFieldValue("network")];
    const filtered = allPlans.filter(
      (plan) => plan.network === network && plan.plan_type === value
    );
    setFilteredPlans(filtered);
    setSelectedPlan(null);
  };

  // Handle plan selection
  const handlePlanSelection = (value) => {
    const selected = filteredPlans.find((plan) => plan.id === value);
    setSelectedPlan(selected);
  };

  const showConfirmation = async (values, selectedPlan) => {
    const result = await Swal.fire({
      title: "Confirm Data Purchase",
      html: `
      <p class="mb-2">Please confirm your purchase:</p>
      <p class="mb-2">Network: ${selectedPlan.network}</p>
      <p class="mb-2">Data Plan: ${selectedPlan.data_volume}</p>
      <p class="mb-2">Phone Number: ${values.phoneNumber}</p>
      <p class="mb-2">Amount: ${selectedPlan.price}</p>
      <p class="mb-2">Validity: ${selectedPlan.validity}</p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d10",
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    });

    return result.isConfirmed;
  };

  const onFinish = async (values) => {
    if (!selectedPlan) {
      Swal.fire({
        title: "Error!",
        text: "Please select a data plan!",
        icon: "error",
        confirmButtonColor: "#d10",
      });
      return;
    }

    const planPrice = parseFloat(
      selectedPlan.price.replace("₦", "").replace(",", "")
    );

    if (planPrice > (account?.balance || 0)) {
      Swal.fire({
        title: "Error!",
        text: "Insufficient balance!",
        icon: "error",
        confirmButtonColor: "#d10",
      });
      return;
    }

    // Show confirmation dialog
    const confirmed = await showConfirmation(values, selectedPlan);
    if (!confirmed) return;

    setLoading(true);
    try {
      const encryptedUser = localStorage.getItem("user");
      const userData = decryptData(encryptedUser);
      const userId = userData?._id || userData?.id;

      if (!userId) {
        Swal.fire({
          title: "Error!",
          text: "Please login to continue",
          icon: "error",
          confirmButtonColor: "#d10",
        });
        return;
      }

      // Update the payload in onFinish function
      const payload = {
        network: Number(values.network), // Convert network to number based on reverse mapping
        phone: values.phoneNumber,
        dataPlan: selectedPlan.id,
        userId: userId,
        amount: planPrice,
        pin: values.transactionPin,
      };
      console.log("Payload:", payload);
      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.dataSubscription}`,
        payload
      );

      if (response.data?.data?.status === "success") {
        try {
          // Refresh account balance first
          const accountResponse = await axios.get(
            `${config.apiBaseUrl}/virtualAccount/${userId}`
          );

          // Update account state with new balance
          const newAccountData = accountResponse.data;
          setAccount(newAccountData);

          // Wait for state update
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Show success message after balance update
          await Swal.fire({
            title: "Success!",
            html: `
            <p class="mb-2">Data purchase successful!</p>
            <p class="mb-2">New Balance: ₦${newAccountData.balance.toFixed(
              2
            )}</p>
          `,
            icon: "success",
            confirmButtonColor: "#f59e0b",
          });

          form.resetFields();
          setSelectedPlan(null);
        } catch (error) {
          console.error("Error updating balance:", error);
          Swal.fire({
            title: "Warning!",
            text: "Transaction successful but balance may be outdated. Please refresh.",
            icon: "warning",
            confirmButtonColor: "#f59e0b",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Transaction failed",
          icon: "error",
          confirmButtonColor: "#d10",
        });
      }
    } catch (error) {
      console.error("Transaction error:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Transaction failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#d10",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Data Subscription</span>
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
          // Remove initialValues or set to undefined
          // initialValues={{ network: "mtn" }}
        >
          <Form.Item
            name="network"
            label="Select Network"
            rules={[{ required: true, message: "Please select a network!" }]}
          >
            <Select
              placeholder="Select network"
              size="large"
              onChange={handleNetworkChange}
            >
              <Select.Option value="1">MTN</Select.Option>
              <Select.Option value="2">AIRTEL</Select.Option>
              <Select.Option value="3">GLO</Select.Option>
              <Select.Option value="4">9MOBILE</Select.Option>
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
              {/* Show all available plan types for the selected network */}
              {allPlans
                .filter(
                  (plan) =>
                    plan.network ===
                    networkMapping[form.getFieldValue("network")]
                )
                .reduce((types, plan) => {
                  if (!types.includes(plan.plan_type)) {
                    types.push(plan.plan_type);
                  }
                  return types;
                }, [])
                .map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
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
              onChange={handlePlanSelection}
            >
              {filteredPlans
                .filter(
                  (plan) =>
                    !form.getFieldValue("planType") ||
                    plan.plan_type === form.getFieldValue("planType")
                )
                .map((plan) => (
                  <Select.Option key={plan.id} value={plan.id}>
                    {`${plan.data_volume} - ${plan.price} - ${plan.validity} (${plan.plan_type})`}
                  </Select.Option>
                ))}
            </Select>
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

          {selectedPlan && (
            <div className="selected-plan-details mb-4 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold">Selected Plan Details:</h4>
              <p>Data: {selectedPlan.data_volume}</p>
              <p>Price: {selectedPlan.price}</p>
              <p>Validity: {selectedPlan.validity}</p>
            </div>
          )}

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
