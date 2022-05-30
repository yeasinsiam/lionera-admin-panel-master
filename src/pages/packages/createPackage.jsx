import React, { useState } from "react";
import { Form, Input, Button, Select, Space, message, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

function CreatePackage() {
  const [lang, setLang] = useState("both");
  const [ocassions, setOcassion] = useState([]);

  const selectLang = (value) => {
    setLang(value);
    getOccassion(value);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const getOccassion = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/occasions?lang=${lang}`);
      setOcassion(res.data.body.occasions);
    } catch {
      alert("Something went wrong");
    }
  };

  const CreatePackage = async (value) => {
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

      // console.log(body);

      await axios.post("/api/v1/packages", { ...body });
      message.success(`Design Created successfully`);
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  return (
    <div>
      <Form name="createOccassionForm" form={form} onFinish={CreatePackage}>
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

        <Form.Item label="Select Occasion" name="occasion">
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
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
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
            Create Package
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePackage;
