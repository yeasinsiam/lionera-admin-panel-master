import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function AddDesign() {
  const [lang, setLang] = useState("both");
  const [fileLink, setFileLink] = useState([]);
  const [ocassions, setOcassion] = useState([]);

  const selectLang = (value) => {
    setLang(value);
    getOccassion(value);
  };

  const getOccassion = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/occasions?lang=${lang}`);
      setOcassion(res.data.body.occasions);
    } catch {
      alert("Something went wrong");
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "/api/v1/upload",
    showRemoveIcon: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileLink(info.file.name);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const CreateDesign = async (value) => {
    try {
      let galleryImages = [];
      let uploadedImage = value.file.fileList;
      uploadedImage.forEach(async (item) => {
        galleryImages.push({ url: item.response.body.url });
      });

      const body = {
        gallery: galleryImages,
        occasion: value.occasion,
        lang: value.lang,
      };

      let res = await axios.post("/api/v1/designs", { ...body });
      message.success(`Design Created successfully`);
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  return (
    <div>
      <Form name="createOccassionForm" onFinish={CreateDesign}>
        <Form.Item label="Language" name="lang">
          <Select
            onChange={selectLang}
            name="lang"
            placeholder="Select Lanageuge"
          >
            <Select.Option value="ar">Arabic</Select.Option>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="both">Both</Select.Option>
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

        <Form.Item name="file">
          <Upload {...uploadProps} name="file">
            <Button icon={<UploadOutlined />}>Click to Design</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={fileLink.length === 0 ? true : false}
          >
            Create Design
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddDesign;
