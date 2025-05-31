import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { config } from "../../config/config";
import CryptoJS from "crypto-js";

const { Title, Text } = Typography;

function SetPin() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

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

  const onFinish = async (values) => {
    if (values.pin !== values.confirmPin) {
      toast.error("PINs do not match!");
      return;
    }

    setLoading(true);
    try {
      const userData = decryptData(localStorage.getItem("user"));
      if (!userData) {
        toast.error("Please login to continue");
        return;
      }

      const response = await axios.post(`${config.apiBaseUrl}/user/set-pin`, {
        userId: userData._id,
        pin: values.pin,
      });

      if (response.data.success) {
        toast.success("Transaction PIN set successfully!");
        form.resetFields();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to set PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={3} className="text-center mb-6">
          Set Transaction PIN
        </Title>
        <Text className="block text-center mb-6">
          This PIN will be required for all transactions
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="pin"
            label="Enter PIN"
            rules={[
              { required: true, message: "Please enter your PIN" },
              { len: 6, message: "PIN must be 6 digits" },
            ]}
          >
            <Input.Password
              maxLength={6}
              placeholder="Enter 6-digit PIN"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPin"
            label="Confirm PIN"
            rules={[
              { required: true, message: "Please confirm your PIN" },
              { len: 6, message: "PIN must be 6 digits" },
            ]}
          >
            <Input.Password
              maxLength={6}
              placeholder="Confirm 6-digit PIN"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Set PIN
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default SetPin;
