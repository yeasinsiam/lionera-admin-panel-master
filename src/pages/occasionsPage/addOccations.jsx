import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function AddOccations() {
  const [lang, setLang] = useState("both");
  const [fileLink, setFileLink] = useState("");
  const selectLang = (value) => {
    setLang(value);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "/api/v1/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileLink(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setFileLink("");
    },
  };

  const CreateOccation = async (value) => {
    try {
      let body = {};
      let uploadedImage = await value.file.fileList[0].response.body.url;
      if (lang === "ar") {
        body = {
          ar: {
            title: value.ar,
          },
          lang: lang,
          thumbnails: uploadedImage,
        };
      } else if (lang === "en") {
        body = {
          en: {
            title: value.en,
          },
          lang: lang,
          thumbnails: uploadedImage,
        };
      } else if (lang === "both") {
        body = {
          en: {
            title: value.en,
          },
          ar: {
            title: value.ar,
          },
          lang: lang,
          thumbnails: uploadedImage,
        };
      }

      const res = await axios.post("/api/v1/occasions", { ...body });
      if (res.data.success === true) {
        console.log(res.data);
        message.success(`Occasion Created successfully`);
      }
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };
  return (
    <div>
      <Form name="createOccassionForm" onFinish={CreateOccation}>
        <Form.Item label="Language" name="lang">
          <Select onChange={selectLang} name="lang" defaultValue="both">
            <Select.Option value="ar">Arabic</Select.Option>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="both">Both</Select.Option>
          </Select>
        </Form.Item>
        {lang === "ar" ? (
          <Form.Item
            label="Arabic Title"
            name="ar"
            rules={[{ required: true, message: "Please input Arabic Title!" }]}
          >
            <Input type="text" name="ar" placeholder="Enter Arabic Title" />
          </Form.Item>
        ) : null}

        {lang === "en" ? (
          <Form.Item
            label="English Title"
            name="en"
            rules={[{ required: true, message: "Please input English Title!" }]}
          >
            <Input type="text" name="en" placeholder="Enter English Title" />
          </Form.Item>
        ) : null}

        {lang === "both" ? (
          <>
            {" "}
            <Form.Item
              label="English Title"
              name="en"
              rules={[
                { required: true, message: "Please input English Title!" },
              ]}
            >
              <Input type="text" name="en" placeholder="Enter English Title" />
            </Form.Item>
            <Form.Item
              label="Arabic Title"
              name="ar"
              rules={[
                { required: true, message: "Please input Arabic Title!" },
              ]}
            >
              <Input type="text" name="ar" placeholder="Enter Arabic Title" />
            </Form.Item>
          </>
        ) : null}

        <Form.Item name="file">
          <Upload {...uploadProps} name="file">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={fileLink === "" ? true : false}
          >
            Create Occassion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddOccations;
