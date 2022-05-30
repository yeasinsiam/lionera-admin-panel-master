import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Image,
  Select,
  Radio,
  Spin,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const [form] = Form.useForm();
  const [occasion, setOccasion] = useState({});
  const [isLoading, setLoading] = useState(true);
  let { id } = useParams();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const loadOccation = async () => {
    try {
      const res = await axios.get(`/api/v1/occasions/${id}`);
      setOccasion(res.data.body.occasion);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(occasion);
  const props = {
    name: "file",
    action: "/api/v1/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    if (id) {
      loadOccation();
    }
  }, [id]);
  if (isLoading) {
    return <Spin />;
  } else
    return (
      <div style={{ paddingTop: "6rem" }}>
        <div>
          <Typography.Title level={3}> Edit Ocassion </Typography.Title>
        </div>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: "2rem" }}
        >
          <Row gutter={24}>
            <Col span={12} key={occasion._id}>
              <Form.Item
                name="o"
                colon={false}
                labelPosition="top"
                label="Arabic Title"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter arabic Title"
                  size="large"
                  style={{ margin: "5px" }}
                  defaultValue={occasion.ar.title}
                />
              </Form.Item>
            </Col>
            <Col span={12} key={"english-title"}>
              <Form.Item
                name="english-title"
                colon={false}
                labelPosition="top"
                label="English Title"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter English Tile"
                  size="large"
                  style={{ margin: "5px" }}
                  defaultValue={occasion.en.title}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image width={200} src={occasion.thumbnails} />
            </Col>
          </Row>
        </Form>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button
          type="primary"
          htmlType="submit"
          disabled={false}
          style={{ marginTop: "1rem" }}
        >
          Create Occassion
        </Button>
      </div>
    );
};

export default EditPage;
