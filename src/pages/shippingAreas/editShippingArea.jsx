import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, InputNumber } from "antd";
import axios from "axios";
// import Title from "antd/lib/skeleton/Title";

const EditShippingArea = ({
  item, //item data
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);

  // const props = {
  //   name: "file",
  //   action: "/api/v1/upload",
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       console.log(info.file);
  //       message.success(`${info.file.name} file uploaded successfully`);
  //       setFileLink(`${info.file.response.body.url}`);
  //     } else if (info.file.status === "error") {
  //       setFileLink("");
  //     }
  //   },
  //   onRemove() {
  //     setFileLink("");
  //   },
  // };

  const updateShippingArea = async (value) => {
    try {
      let body = {
        name: value.name,
        price: {
          AED: value.price,
        },
      };
      const res = await axios.put(`/api/v1/shipping-areas/${data._id}`, {
        ...body,
      });
      if (res.data.success === true) {
        console.log(res.data);
        message.success(`Shipping area updated successfully`);
      }
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  if (!data) {
    return <Spin />;
  }
  console.log(data);

  const formInitialValus = {
    name: data.name,
    price: data.price.AED,
  };

  return (
    <div>
      <Form
        name="createOccassionForm"
        onFinish={updateShippingArea}
        initialValues={formInitialValus}
      >
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
            Update Shipping Area
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditShippingArea;
