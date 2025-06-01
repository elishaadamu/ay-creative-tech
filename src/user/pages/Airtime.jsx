import React, { useEffect } from "react";
import { Form, Input, Select, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AirtimeSub() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = decryptData(userStr);
        if (!userObj?.hasPin) {
          toast.info("Please set your transaction PIN first!", {
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/dashboard/setpin", {
              state: {
                returnPath: "/airtime",
              },
            });
          }, 2000);
          return;
        }
      }

      // ...rest of your form submission logic
    } catch (error) {
      console.error("Error:", error);
      toast.error("Transaction failed");
    }
  };

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
                  returnPath: "/dashboard/airtime",
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
        title="Data Subscription"
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
            autoComplete="off"
          >
            <Select placeholder="Select network" size="large">
              <Select.Option value="mtn">MTN</Select.Option>
              <Select.Option value="airtel">Airtel</Select.Option>
              <Select.Option value="glo">Glo</Select.Option>
              <Select.Option value="9mobile">9Mobile</Select.Option>
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
            name="Amount"
            label="Amount"
            autoComplete="off"
            rules={[
              { required: true, message: "Please input the amount!" },
              { min: 1, message: "Amount must be at least 1!" },
            ]}
          >
            <Input placeholder="Enter amount" size="large" autoComplete="off" />
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
            <Button type="primary" htmlType="submit" size="large" block>
              Purchase
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AirtimeSub;
