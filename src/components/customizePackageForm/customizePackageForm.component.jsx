import React from 'react';

import { Form, Row, Col, Input, Button, Typography, Select } from 'antd';
import './customizePackage.styles.css';
import DynamicFieldSet from '../AddValueInput/AddValue.component';

const AdvancedSearchForm = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      layout="vertical"
      style={{ marginTop: '2rem' }}
    >
      <Row gutter={24}>
        <Col span={12} key={'name'}>
          <Form.Item
            name="name"
            colon={false}
            labelPosition="top"
            label="Package Name"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input
              placeholder="Enter Name"
              size="large"
              style={{ margin: '5px' }}
            />
            <Input
              placeholder="أدخل الاسم"
              size="large"
              style={{ margin: '5px' }}
            />
          </Form.Item>
        </Col>
        <Col span={12} key={'packagedetails'}>
          <Form.Item
            name="Package Details"
            label="Package Details"
            colon={false}
            labelPosition="top"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input
              placeholder="Enter Package details"
              size="large"
              style={{ margin: '5px' }}
            />
            <Input
              placeholder="أدخل تفاصيل الحزمة"
              size="large"
              style={{ margin: '5px' }}
            />
          </Form.Item>
        </Col>
        <Col span={12} key={'price'}>
          <Form.Item
            name="price"
            colon={false}
            label="Price"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input
              placeholder="Enter Price"
              size="large"
              style={{ margin: '5px' }}
            />
            <Input
              placeholder="ادخل السعر"
              size="large"
              style={{ margin: '5px' }}
            />
          </Form.Item>
          <DynamicFieldSet />
        </Col>
        <Col span={12} key={1}>
          <Typography.Title level={3} style={{ marginLeft: '5px' }}>
            {' '}
            User Data{' '}
          </Typography.Title>
          <Form.Item
            name="name"
            colon={false}
            label="Input Type"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Select
              placeholder="Please select input type"
              label="Input Type"
              size="large"
              style={{ margin: '5px' }}
            >
              <Option value="china">Text</Option>
              <Option value="usa">File</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            colon={false}
            labelPosition="top"
            label="Place Holder Text"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input
              placeholder="Enter placeHolder Text"
              size="large"
              style={{ margin: '5px' }}
            />
          </Form.Item>
          <Form.Item
            name="input"
            colon={false}
            label="Input"
            labelPosition="top"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input
              placeholder="Enter Text"
              size="large"
              style={{ margin: '5px' }}
            />
            <Input
              placeholder="ادخل النص"
              size="large"
              style={{ margin: '5px' }}
            />
          </Form.Item>
        </Col>
        <Col span={12} key={'input'}></Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;
