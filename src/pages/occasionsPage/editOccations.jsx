import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Spin,
  Row,
  Col,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
// import Title from "antd/lib/skeleton/Title";

const EditOccations = ({
  item, //item data
}) => {
  const [lang, setLang] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [data, setData] = useState(null);
  const selectLang = (value) => {
    setLang(value);
  };

  useEffect(() => {
    if (item) {
      setLang(item.lang);
      setFileLink(item.thumbnails);
      setData(item);
    }
  }, [item]);

  const props = {
    name: "file",
    action: "/api/v1/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(info.file);
        message.success(`${info.file.name} file uploaded successfully`);
        setFileLink(`${info.file.response.body.url}`);
      } else if (info.file.status === "error") {
        setFileLink("");
      }
    },
    onRemove() {
      setFileLink("");
    },
  };

  const updateOccation = async (value) => {
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

      const res = await axios.put(`/api/v1/occasions/${data._id}`, {
        ...body,
      });
      if (res.data.success === true) {
        message.success(`Occasion Updated successfully`);
      }
    } catch (err) {
      message.error(`Something went wrong, Refresh and try again`);
    }
  };

  if (!data) {
    return <Spin />;
  }

  const formInitialValus = () => {
    let initialValues = {
      file: {
        fileList: [{ response: { body: { url: fileLink } } }],
      },
    };
    switch (lang) {
      case "both":
        initialValues = {
          ...initialValues,
          lang: lang,
          ar: data.ar ? data.ar.title : "",
          en: data.en ? data.en.title : "",
        };
        break;
      case "ar":
        initialValues = {
          ...initialValues,
          lang: lang,
          ar: data.title,
        };
        break;
      //default en case
      default:
        initialValues = {
          ...initialValues,
          lang: lang,
          en: data.title,
        };
        break;
    }
    return initialValues;
  };

  // console.log(data);
  return (
    <div>
      <Form
        name="createOccassionForm"
        onFinish={updateOccation}
        initialValues={formInitialValus()}
      >
        <Form.Item label="Language" name="lang">
          <Select onChange={selectLang} name="lang">
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
            <Input
              type="text"
              name="ar"
              placeholder="Enter Arabic Title"
              // defaultValue={data.title}
            />
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

        {lang === "both" && (
          <>
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
        )}
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Image width={200} src={fileLink} />
          </Col>
        </Row>

        <Form.Item name="file">
          <Upload
            {...props}
            multiple={false}
            name="file"
            accept="image/png, image/jpeg"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={fileLink === "" ? true : false}
          >
            Update Occassion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditOccations;
