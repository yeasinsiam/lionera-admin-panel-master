import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Select,
  message,
  Spin,
  Input,
  InputNumber,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const EditPackage = ({ item }) => {
  const [form] = Form.useForm();
  const [lang, setLang] = useState("");
  const [data, setData] = useState(null);
  const [ocassions, setOcassion] = useState([]);
  const selectLang = (value) => {
    setLang(value);
    getOccassion(value);
    form.setFieldsValue({ occasion: "" });
  };

  const getOccassion = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/occasions?lang=${lang}`);
      setOcassion(res.data.body.occasions);
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (item) {
      setLang(item.lang);
      setData(item);
      getOccassion(item.lang);
    }
  }, [item]);

  if (!data) {
    return <Spin />;
  }

  const UpdatePackage = async (value) => {
    try {
      const { benefits, title, price, occasion, lang } = value;
      let body = {};
      if (lang === "ar") {
        body = {
          ar: {
            title,
            benefits,
          },
          lang,
          price: {
            AED: price,
            USD: 0,
          },
          occasion,
        };
      }

      if (lang === "en") {
        body = {
          en: {
            title,
            benefits,
          },
          lang,
          price: {
            AED: price,
            USD: 0,
          },
          occasion,
        };
      }

      await axios.put(`/api/v1/packages/${data._id}`, { ...body });
      message.success(`Design Created successfully`);
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  const formInitialValus = {
    lang,
    occasion: data.occasion._id,
    title: data.title,
    price: data.price.AED,
    benefits: data.benefits,
  };

  return (
    <div>
      <Form
        name="createOccassionForm"
        form={form}
        onFinish={UpdatePackage}
        initialValues={formInitialValus}
      >
        <Form.Item label="Language" name="lang">
          <Select
            onChange={selectLang}
            name="lang"
            placeholder="Select Lanageuge"
          >
            <Select.Option value="ar">Arabic</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Occasion"
          name="occasion"
          rules={[{ required: true, message: "Please select Occasion" }]}
        >
          <Select name="occasion">
            {ocassions.map((item, key) => {
              return (
                <Select.Option key={key} value={item._id}>
                  {("both" === item.lang && item.en.title) || item.title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Title!" }]}
        >
          <Input type="text" name="title" placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input Price!" }]}
        >
          <InputNumber name="price" placeholder="Price" />
        </Form.Item>

        <Form.List name="benefits">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  size="large"
                  style={{ display: "flex" }}
                >
                  <Form.Item
                    {...field}
                    label="Benifits"
                    name={[field.name, "title"]}
                    fieldKey={[field.fieldKey, "title"]}
                    rules={[{ required: true, message: "Missing Benifits" }]}
                    // style={{ flexGrow: "2" }}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined
                    // style={{ flexBasis: "10%" }}
                    onClick={() => remove(field.name)}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Benifit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Package
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPackage;
