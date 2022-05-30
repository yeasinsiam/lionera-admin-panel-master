import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const EditAddons = ({ item }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);

  if (!data) {
    return <Spin />;
  }

  const UpdateForm = async (value) => {
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

      await axios.put(`/api/v1/addons/${data._id}`, { ...body });

      message.success(`Addon updated successfully`);
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  const formInitialValus = {
    ar_title: data.ar.title,
    ar_label: data.ar.label,
    en_title: data.en.title,
    en_label: data.en.label,
    inputType: data.inputType,
    price: data.price,
  };

  return (
    <div>
      <Form
        name="createOccassionForm"
        onFinish={UpdateForm}
        initialValues={formInitialValus}
      >
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
            Update Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAddons;
