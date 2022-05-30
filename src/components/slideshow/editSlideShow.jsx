import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Space,
  message,
  InputNumber,
  Spin,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const EditSlideShow = ({ item }) => {
  console.log(item);
  const [form] = Form.useForm();
  const [lang, setLang] = useState("");
  const [packages, setPackages] = useState([]);
  const [ocassions, setOcassion] = useState([]);
  const [data, setData] = useState(null);

  const selectLang = (value) => {
    setLang(value);
    getPackages(value);
    getOccassion(value);
    form.setFieldsValue({ occasion: "", package: "", title: "" });
  };

  const getOccassion = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/occasions?lang=${lang}`);
      setOcassion(res.data.body.occasions);
    } catch {
      alert("Something went wrong");
    }
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
      getOccassion(item.lang);
      getPackages(item.lang);
    }
  }, [item]);

  if (!data) {
    return <Spin />;
  }

  const UpdateSlideshow = async (value) => {
    try {
      let body = {
        type: "youtube",
        lang: value.lang,
        occasion: value.occasion,
        package: value.package,
        URL: value.URL,
      };
      if (lang === "ar") {
        body = {
          ...body,
          ar: {
            title: value.title,
          },
        };
      } else if (lang === "en") {
        body = {
          ...body,
          en: {
            title: value.title,
          },
        };
      }
      const res = await axios.put(`/api/v1/slideshows/${data._id}`, {
        ...body,
      });
      message.success(`Slideshow Updated successfully`);
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  const formInitialValus = {
    lang,
    occasion: data.occasion,
    package: data.package._id,
    title: data.title,
    URL: data.URL,
  };

  return (
    <div>
      <Form
        name="createOccassionForm"
        form={form}
        onFinish={UpdateSlideshow}
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
          rules={[{ required: true, message: "Please select a occasion" }]}
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
          label="Select Package"
          name="package"
          rules={[{ required: true, message: "Please select a package" }]}
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Title!" }]}
        >
          <Input type="text" name="title" placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Youtube URL"
          name="URL"
          rules={[{ required: true, message: "Please input Youtube URL!" }]}
        >
          <Input type="text" name="URL" placeholder="Youtube URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update SlideShow
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditSlideShow;
