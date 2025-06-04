import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { config } from "../../config/config";

function CAC() {
  const [form] = Form.useForm();
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [passportPreview, setPassportPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  // Fetch states effect
  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, []);

  // Fetch LGAs effect
  const handleStateChange = (value) => {
    fetch(`https://nga-states-lga.onrender.com/?state=${value}`)
      .then((res) => res.json())
      .then((data) => setLgas(data))
      .catch(() => setLgas([]));
  };

  const onFinish = async (values) => {
    try {
      // Create FormData object for file uploads
      const formData = new FormData();

      // Append all form values
      Object.keys(values).forEach((key) => {
        if (key === "passport" || key === "signature") {
          // Handle file uploads
          if (values[key]?.[0]?.originFileObj) {
            formData.append(key, values[key][0].originFileObj);
          }
        } else if (key === "dob") {
          // Format date
          formData.append(key, values[key].format("YYYY-MM-DD"));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Make API call
      const response = await fetch(`${config.apiBaseUrl}/cac/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if authentication is required
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      if (data.success) {
        message.success("Business registration submitted successfully");
        form.resetFields(); // Clear form
        setPassportPreview(null); // Clear previews
        setSignaturePreview(null);
      } else {
        message.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Failed to submit registration. Please try again.");
    }
  };

  return (
    <div className="w-full rounded-2xl mb-5 bg-white p-5 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Business Registration Form</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={true}
      >
        <Form.Item
          name="registrationType"
          label="Registration Type"
          rules={[
            { required: true, message: "Please select registration type" },
          ]}
        >
          <Select>
            <Select.Option value="BN">Business Name (BN)</Select.Option>
            <Select.Option value="LLC">
              Limited Liability Company (LLC)
            </Select.Option>
            <Select.Option value="NGO">
              Non-Governmental Organization (NGO)
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="otherName" label="Other Name">
          <Input />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true },
            { pattern: /^\d{11}$/, message: "Phone number must be 11 digits" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="homeAddress"
          label="Home Address"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="officeAddress"
          label="Office Address"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="natureOfBusiness"
          label="Nature of Business"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="businessName1"
          label="Business Name (First Choice)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="businessName2"
          label="Business Name (Second Choice)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bvn"
          label="BVN Number"
          rules={[
            { required: true },
            { pattern: /^\d{11}$/, message: "BVN must be 11 digits" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="nin" label="NIN Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="passport"
          label="Passport"
          rules={[
            {
              required: true,
              validator: (_, fileList) => {
                if (fileList && fileList.length > 0) {
                  return Promise.resolve();
                }
                return Promise.reject("Please upload your passport photo");
              },
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            maxCount={1}
            accept=".jpg,.jpeg,.png,.pdf"
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            beforeUpload={(file) => {
              const isValidType = [
                "image/jpeg",
                "image/png",
                "application/pdf",
              ].includes(file.type);
              const isValidSize = file.size / 1024 <= 50;

              if (!isValidType) {
                message.error("You can only upload JPG/PNG/PDF files!");
                return Upload.LIST_IGNORE;
              }
              if (!isValidSize) {
                message.error("File must be smaller than 50KB!");
                return Upload.LIST_IGNORE;
              }

              // Create preview
              const reader = new FileReader();
              reader.onload = (e) => {
                setPassportPreview(e.target.result);
                form.setFieldsValue({ passport: [file] }); // Update form value
              };
              reader.readAsDataURL(file);
              return false;
            }}
            onRemove={() => {
              setPassportPreview(null);
              form.setFieldsValue({ passport: [] }); // Clear form value
            }}
            fileList={form.getFieldValue("passport") || []}
          >
            <Button icon={<UploadOutlined />} size="large">
              Upload Passport Photo
            </Button>
          </Upload>
          {passportPreview && (
            <div className="mt-2">
              <img
                src={passportPreview}
                alt="Passport preview"
                className="max-w-[200px] max-h-[200px] object-contain"
              />
            </div>
          )}
          <div className="text-gray-500 text-sm mt-1">
            File requirements:
            <ul className="list-disc ml-4">
              <li>Maximum file size: 50KB</li>
              <li>Allowed file types: JPG, JPEG, PNG, PDF</li>
              <li>Recent passport photograph with white background</li>
            </ul>
          </div>
        </Form.Item>

        <Form.Item
          name="email"
          label="Functional Email Address"
          rules={[
            { required: true },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="stateOfOrigin"
          label="State of Origin"
          rules={[{ required: true }]}
        >
          <Select onChange={handleStateChange}>
            {states.map((state, idx) => (
              <Select.Option key={idx} value={state}>
                {state}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="lgaOfOrigin"
          label="Local Government of Origin"
          rules={[{ required: true }]}
        >
          <Select>
            {lgas.map((lga, idx) => (
              <Select.Option key={idx} value={lga}>
                {lga}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="signature"
          label="Signature"
          rules={[
            {
              required: true,
              validator: (_, fileList) => {
                if (fileList && fileList.length > 0) {
                  return Promise.resolve();
                }
                return Promise.reject("Please upload your signature");
              },
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            maxCount={1}
            accept=".jpg,.jpeg,.png,.pdf"
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            beforeUpload={(file) => {
              const isValidType = [
                "image/jpeg",
                "image/png",
                "application/pdf",
              ].includes(file.type);
              const isValidSize = file.size / 1024 <= 50;

              if (!isValidType) {
                message.error("You can only upload JPG/PNG/PDF files!");
                return Upload.LIST_IGNORE;
              }
              if (!isValidSize) {
                message.error("File must be smaller than 50KB!");
                return Upload.LIST_IGNORE;
              }

              // Create preview
              const reader = new FileReader();
              reader.onload = (e) => {
                setSignaturePreview(e.target.result);
                form.setFieldsValue({ signature: [file] }); // Added this line to match passport setup
              };
              reader.readAsDataURL(file);
              return false;
            }}
            onRemove={() => {
              setSignaturePreview(null);
              form.setFieldsValue({ signature: [] }); // Added this line to match passport setup
            }}
            fileList={form.getFieldValue("signature") || []} // Added this line to match passport setup
          >
            <Button icon={<UploadOutlined />} size="large">
              Upload Signature
            </Button>
          </Upload>
          {signaturePreview && (
            <div className="mt-2">
              <img
                src={signaturePreview}
                alt="Signature preview"
                className="max-w-[200px] max-h-[200px] object-contain"
              />
            </div>
          )}
          <div className="text-gray-500 text-sm mt-1">
            File requirements:
            <ul className="list-disc ml-4">
              <li>Maximum file size: 50KB</li>
              <li>Allowed file types: JPG, JPEG, PNG, PDF</li>
              <li>Clear signature on white background</li>
            </ul>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-amber-500"
          >
            Submit Registration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CAC;
