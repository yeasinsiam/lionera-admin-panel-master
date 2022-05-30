import React, { useEffect, useState } from "react";
import { Form, Button, Select, Upload, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { getGalleryFormat } from "../../helpers/editHelpers";

const EditDesign = ({ item }) => {
  const [form] = Form.useForm();
  const [lang, setLang] = useState("");
  const [files, setFiles] = useState([]);
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
      setFiles(getGalleryFormat(item.gallery));
      setData(item);
      getOccassion(item.lang);
    }
  }, [item]);

  if (!data) {
    return <Spin />;
  }

  const uploadProps = {
    name: "file",
    action: "/api/v1/upload",
    showRemoveIcon: false,
    defaultFileList: files,
    onRemove: (removedFile) => {
      setFiles(files.filter((item) => item.uid !== removedFile.uid));
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

        setFiles([
          ...files,
          {
            uid: info.file.uid,
            url: info.file.response.body.url,
          },
        ]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const formInitialValus = {
    lang,
    occasion: data.occasion._id,
    files,
  };

  const UpdateDesign = async (value) => {
    try {
      let galleryImages = [];
      files.forEach(async (item) => {
        galleryImages.push({ url: item.url });
      });

      const body = {
        gallery: galleryImages,
        occasion: value.occasion,
        lang: value.lang,
      };
      await axios.put(`/api/v1/designs/${data._id}`, {
        ...body,
      });
      message.success(`Design Created successfully`);
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="createOccassionForm"
        onFinish={UpdateDesign}
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
            <Select.Option value="both">Both</Select.Option>
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

        <Form.Item name="file">
          <Upload
            {...uploadProps}
            listType="picture-card"
            className="avatar-uploader"
            name="file"
          >
            <div>
              <PlusOutlined />
              <div
                style={{ marginTop: 8, fontSize: "12px", fontWeight: "bold" }}
              >
                Click to Design
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={files.length === 0 ? true : false}
          >
            Update Design
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDesign;
