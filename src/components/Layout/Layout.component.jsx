import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Typography, Spin } from "antd";
import {
  PlusCircleOutlined,
  ProfileOutlined,
  TagOutlined,
  CalendarOutlined,
  AntDesignOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import "./Layout.styles.css";
import Logo from "../../assets/img_lionera_gifts.png";

import Routes from "../../routes";
import { useAuth } from "../../hooks/useAuth";
import SpinFC from "antd/lib/spin";

const GeneralLayout = () => {
  const { Content, Sider } = Layout;

  // <Breadcrumb style={{ margin: '16px 0' }}>
  //   <Breadcrumb.Item>Home</Breadcrumb.Item>
  //   <Breadcrumb.Item>List</Breadcrumb.Item>
  //   <Breadcrumb.Item>App</Breadcrumb.Item>
  // </Breadcrumb>;

  const history = useHistory();
  console.log();

  const activeMenuString = () => {
    return history.location.pathname !== "/"
      ? history.location.pathname.substring(1)
      : "ocassions";
  };

  const { authed, logout, authenticating } = useAuth();

  return (
    <Layout style={{ display: "flex" }}>
      {authed && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ backgroundColor: "white" }}
        >
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <img src={Logo} alt="brand" />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeMenuString()]}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              paddingTop: "3rem",
            }}
            onClick={(e) => {
              return "logout" === e.key
                ? logout()
                : e.key === "ocassions"
                ? history.push("/")
                : history.push(`/${e.key}`);
            }}
          >
            <Menu.ItemGroup>
              {authed && (
                <>
                  <Menu.Item
                    key="ocassions"
                    className="customclass"
                    icon={<CalendarOutlined />}
                  >
                    Ocassions
                  </Menu.Item>

                  <Menu.Item key="design" icon={<AntDesignOutlined />}>
                    Design
                  </Menu.Item>

                  <Menu.Item key="packages" icon={<TagOutlined />}>
                    Packages
                  </Menu.Item>

                  <Menu.Item key="slideshow" icon={<AntDesignOutlined />}>
                    Slideshow
                  </Menu.Item>

                  <Menu.Item key="forms" icon={<AntDesignOutlined />}>
                    Forms
                  </Menu.Item>

                  <Menu.Item key="addons" icon={<PlusCircleOutlined />}>
                    Add-Ons
                  </Menu.Item>
                  <Menu.Item key="ordermanager" icon={<ProfileOutlined />}>
                    Order Manager
                  </Menu.Item>
                  <Menu.Item key="shipping-areas" icon={<ProfileOutlined />}>
                    Shipping Areas
                  </Menu.Item>

                  <Menu.Item key="logout" icon={<LogoutOutlined />}>
                    Logout
                  </Menu.Item>
                </>
              )}
            </Menu.ItemGroup>
            <div
              style={{
                height: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0 25px",
                marginTop: "auto",
              }}
            >
              <Content>Language</Content>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  type="link"
                  style={{
                    padding: "2px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  English{" "}
                </Button>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  |{" "}
                </Typography>
                <Button style={{ padding: "2px", color: "GrayText" }}>
                  عربي
                </Button>
              </div>
            </div>
          </Menu>
        </Sider>
      )}

      <Layout style={{ backgroundColor: !authed ? "#ffffff" : "#fbfbfb" }}>
        <Content style={{ padding: "0 50px" }}>
          <div
            className={`site-layout-content ${!authed && "unauthenticated"}`}
          >
            {/* {authenticating || !authed ? <Spin /> : <Routes />} */}
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeneralLayout;
