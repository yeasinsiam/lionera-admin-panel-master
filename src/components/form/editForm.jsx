import React, { useEffect, useState } from "react";
import { Form, Button, Select, message, Spin, Input } from "antd";
import axios from "axios";

const EditForm = ({ item }) => {
  const [form] = Form.useForm();
  const [lang, setLang] = useState("");
  const [packages, setPackages] = useState([]);
  const [data, setData] = useState(null);

  const selectLang = (value) => {
    setLang(value);
    getPackages(value);
    form.setFieldsValue({ package: "" });
  };

  const getPackages = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/packages?lang=${lang}`);
      setPackages(res.data.body.packages);
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (item) {
      setLang(item.lang);
      setData(item);
      getPackages(item.lang);
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
        package: value.package,
        lang: value.lang,
        inputType: value.inputType,
      };

      await axios.put(`/api/v1/forms/${data._id}`, { ...body });

      message.success(`Form Updated successfully`);
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  const formInitialValus = {
    lang: data.lang,
    package: data.package,
    ar_title: data.ar.title,
    ar_label: data.ar.label,
    en_title: data.en.title,
    en_label: data.en.label,
    inputType: data.inputType,
  };

  return (
    <div>
      <Form
        form={form}
        name="createOccassionForm"
        onFinish={UpdateForm}
        initialValues={formInitialValus}
      >
        <Form.Item label="Language" name="lang">
          <Select onChange={selectLang} name="lang" defaultValue="en">
            <Select.Option value="ar">Arabic</Select.Option>
            <Select.Option value="en">English</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Package"
          name="package"
          rules={[{ required: true, message: "Please select a Package" }]}
        >
          <Select name="package">
            {packages.map((item, key) => {
              return (
                <Select.Option key={key} value={item._id}>
                  {item.title}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditForm;
