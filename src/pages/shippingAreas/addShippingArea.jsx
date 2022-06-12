import React from "react";
import { Form, Input, Button, message, InputNumber } from "antd";
import axios from "axios";

function AddShippingArea() {
  const createShippingArea = async (value) => {
    try {
      let body = {
        name: value.name,
        price: {
          AED: value.price,
        },
      };
      const res = await axios.post("/api/v1/shipping-areas", { ...body });
      if (res.data.success === true) {
        console.log(res.data);
        message.success(`Shipping area created successfully`);
      }
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };
  return (
    <div>
      <Form name="createOccassionForm" onFinish={createShippingArea}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input type="text" name="name" placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Price (AED)"
          name="price"
          rules={[{ required: true, message: "Please  Input price!" }]}
        >
          <InputNumber name="price" placeholder="Enter price" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Shipping Area
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddShippingArea;
