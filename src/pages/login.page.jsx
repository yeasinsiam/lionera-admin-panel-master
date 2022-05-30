import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/img_lionera_gifts.png";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-from-container">
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px 0px",
        }}
      >
        <img src={Logo} alt="brand" />
      </div>
      <div className="login-from-wraper">
        <Form
          className="login-form"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
