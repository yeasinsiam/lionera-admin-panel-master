import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function CreateAdddons() {
  const createForm = async (value) => {
    try {
      let body = {
        en: {
          title: value.en_title,
          label: value.en_label,
        },
        ar: {
          title: value.ar_title,
          label: value.ar_label,
        },
        price: value.price,
        inputType: value.inputType,
        currency: "AED",
      };

      await axios.post("/api/v1/addons", { ...body });

      message.success(`Addon Created successfully`);
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };
  return (
    <div>
      <Form name="createOccassionForm" onFinish={createForm}>
        <Form.Item
          label="Arabic Title"
          name="ar_title"
          rules={[{ required: true, message: "Please input Arabic Title!" }]}
        >
          <Input type="text" name="ar_title" placeholder="Enter Arabic Title" />
        </Form.Item>
        <Form.Item
          label="Arabic Label"
          name="ar_label"
          rules={[{ required: true, message: "Please input Arabic Label!" }]}
        >
          <Input type="text" name="ar_label" placeholder="Enter Arabic Title" />
        </Form.Item>

        <Form.Item
          label="English Title"
          name="en_title"
          rules={[{ required: true, message: "Please input English Title!" }]}
        >
          <Input
            type="text"
            name="en_title"
            placeholder="Enter English Title"
          />
        </Form.Item>
        <Form.Item
          label="English Label"
          name="en_label"
          rules={[{ required: true, message: "Please input English Label!" }]}
        >
          <Input
            type="text"
            name="en_label"
            placeholder="Enter English Title"
          />
        </Form.Item>
        <Form.Item
          label="Input Type"
          name="inputType"
          rules={[{ required: true, message: "Please select Input type!" }]}
        >
          <Select name="inputType">
            <Select.Option value="file">File</Select.Option>
            <Select.Option value="text">Text</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please  Input price!" }]}
        >
          <InputNumber name="price" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateAdddons;
