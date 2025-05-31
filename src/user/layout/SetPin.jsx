import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CryptoJS from "crypto-js";
import { config } from "../../config/config.jsx";
import { useNavigate } from "react-router-dom";

// Get the secret key from environment variables
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

// Decryption function
function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

function SetPin() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Add useEffect to check PIN status when component mounts
  useEffect(() => {
    const checkExistingPin = async () => {
      const encryptedUser = localStorage.getItem("user");
      if (!encryptedUser) return;

      const decryptedUser = decryptData(encryptedUser);
      if (!decryptedUser || !decryptedUser.id) return;

      try {
        const response = await axios.post(
          `${config.apiBaseUrl}${config.endpoints.setPin}`,
          { userId: decryptedUser.id },
          { withCredentials: true }
        );

        if (response.data?.hasPin) {
          toast.info("You already have a PIN set");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking PIN status:", error);
      }
    };

    checkExistingPin();
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const encryptedUser = localStorage.getItem("user");
      if (!encryptedUser) {
        toast.error("User not found! Please login again.");
        navigate("/login");
        return;
      }

      const decryptedUser = decryptData(encryptedUser);
      if (!decryptedUser || !decryptedUser.id) {
        toast.error("Invalid user data! Please login again.");
        navigate("/login");
        return;
      }

      if (values.pin !== values.confirmPin) {
        toast.error("PINs do not match!");
        setLoading(false);
        return;
      }

      const pinLoad = {
        pin: values.pin,
        userId: decryptedUser.id,
      };

      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.setPin}`,
        pinLoad,
        { withCredentials: true }
      );

      // Check if PIN exists in response
      if (response.data?.hasPin) {
        toast.info("PIN already exists. Redirecting to dashboard...");
        navigate("/dashboard");
        return;
      }

      // If PIN was successfully set
      if (response.data) {
        toast.success("PIN set successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to set PIN. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <Card title="Set Your PIN" className="w-full max-w-md shadow-lg">
        <Form
          form={form}
          name="set_pin"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="pin"
            label="Enter PIN"
            rules={[
              { required: true, message: "Please input your PIN!" },
              { len: 4, message: "PIN must be 4 digits" },
              { pattern: /^\d+$/, message: "PIN must contain only numbers" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
            />
          </Form.Item>

          <Form.Item
            name="confirmPin"
            label="Confirm PIN"
            rules={[
              { required: true, message: "Please confirm your PIN!" },
              { len: 4, message: "PIN must be 4 digits" },
              { pattern: /^\d+$/, message: "PIN must contain only numbers" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm 4-digit PIN"
              maxLength={4}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Set PIN
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SetPin;
