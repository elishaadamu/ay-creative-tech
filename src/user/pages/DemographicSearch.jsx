import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import Swal from "sweetalert2";
import { config } from "../../config/config";
import CryptoJS from "crypto-js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

function DemographicSearch() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isLgaOpen, setIsLgaOpen] = useState(false);
  // Add state for PIN visibility
  const [showPin, setShowPin] = useState(false);

  // Add state for API prices
  const [demographicPrice, setDemographicPrice] = useState(0); // Default price

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

  // Add useEffect to fetch prices when component mounts
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}${config.endpoints.currentapipricing}`,
          { withCredentials: true }
        );

        // Find demographic search pricing
        const demographicPricing = response.data.find(
          (item) => item.serviceKey === "demographic"
        );

        if (demographicPricing) {
          setDemographicPrice(demographicPricing.agentPrice);
        }
      } catch (error) {
        console.error("Error fetching API prices:", error);
        toast.error("Failed to fetch current prices");
      }
    };

    fetchPrices();
  }, []);
  let userId = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userObj = decryptData(userStr);
      userId = userObj?._id || userObj?.id;
      console.log("UserId", userId);
    }
  } catch (error) {
    console.error("Error getting userId:", error);
  }

  const onFinish = async (values) => {
    // Show confirmation dialog first
    const result = await Swal.fire({
      title: "Confirm Search",
      text: `Are you sure you want to proceed with this demographic search? Amount: ₦${demographicPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      // Simplified payload to match new requirements
      const payload = {
        userId: userId,
        amount: demographicPrice,
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob.format("DD-MM-YY"),
        gender: values.gender,
        pin: values.pin,
      };

      console.log("Payload:", payload);

      const response = await axios.post(
        `${config.apiBaseUrl}${config.endpoints.DemographicSearch}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Search Successful!",
          text: "Demographic search completed successfully.",
          confirmButtonColor: "#f59e0b",
        });

        form.resetFields();
      } else {
        throw new Error(response.data.message || "Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);

      // Handle axios error responses
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to perform demographic search. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: errorMessage,
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setLoading(false);
    }
  };

  // effect to handle body scroll
  useEffect(() => {
    if (isBankOpen || isStateOpen || isLgaOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBankOpen, isStateOpen, isLgaOpen]);

  return (
    <div className="w-full rounded-2xl mb-5 bg-white p-5 shadow-lg">
      <h2 className="text-3xl text-center text-amber-500 font-semibold mb-4">
        Demographic Search
      </h2>

      {/* Cost Display */}
      <div className="mb-6 my-5 bg-gray-50 rounded-lg">
        <p className="text-lg font-medium">
          This service will cost you ={" "}
          <span className="p-1 text-lg bg-green-100 text-green-900 rounded">
            ₦{demographicPrice}.00
          </span>
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={true}
      >
        {/* Slip Selection - Fixed with unique keys */}
        <Form.Item
          name="amount"
          label="Select Slip"
          rules={[{ required: true, message: "Please select slip type" }]}
        >
          <Select size="large" placeholder="Select slip type">
            <Select.Option key="premium" value={demographicPrice}>
              Premium Slip = ₦{demographicPrice}
            </Select.Option>
            <Select.Option key="standard" value={demographicPrice}>
              Standard Slip = ₦{demographicPrice}
            </Select.Option>
            <Select.Option key="digital" value="0">
              Digital Slip = ₦0.00
            </Select.Option>
          </Select>
        </Form.Item>

        {/* Alternative approach - use different values if they should be different */}
        {/* 
        <Form.Item
          name="slipType"
          label="Select Slip"
          rules={[{ required: true, message: "Please select slip type" }]}
        >
          <Select size="large" placeholder="Select slip type">
            <Select.Option value="premium">
              Premium Slip = ₦{demographicPrice}
            </Select.Option>
            <Select.Option value="standard">
              Standard Slip = ₦{demographicPrice}
            </Select.Option>
            <Select.Option value="digital">
              Digital Slip = ₦0.00
            </Select.Option>
          </Select>
        </Form.Item>
        */}

        {/* Rest of your existing form fields... */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input size="large" placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input size="large" placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select size="large" placeholder="Select gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" size="large" />
        </Form.Item>

        <Form.Item
          name="pin"
          label="Transaction PIN"
          rules={[
            { required: true, message: "Please enter your 4-digit PIN" },
            { pattern: /^\d{4}$/, message: "PIN must be exactly 4 digits" },
          ]}
        >
          <Input.Password
            size="large"
            maxLength={4}
            placeholder="Enter 4-digit PIN"
            autoComplete="current-password"
            iconRender={(visible) => (
              <span
                onClick={() => setShowPin(!visible)}
                className="cursor-pointer"
              >
                {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full justify-center flex items-center bg-amber-500 mt-[-5px]"
            loading={loading}
          >
            Demographic Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DemographicSearch;
