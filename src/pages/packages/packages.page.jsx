import React, { useState, useEffect } from "react";
import { Typography, Button, Spin, Modal, Select, message } from "antd";
import axios from "axios";
import CreatePackage from "./createPackage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./package.css";
import EditPackage from "../../components/Package/editPackage";

const { Option } = Select;

const PackagesPage = () => {
  const { Title } = Typography;

  const [packages, setPackage] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lang, setLang] = useState("en");
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  useEffect(() => {
    loadPackage(lang);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showEditModal = (item) => {
    setEditModal({
      visible: true,
      data: item,
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    loadPackage(lang);
  };

  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadPackage(lang);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModal({
      visible: false,
      data: null,
    });
  };

  const onChange = (value) => {
    setLang(value);
    loadPackage(value);
  };

  const loadPackage = async (value) => {
    let res = await axios.get(`/api/v1/packages?lang=${value}`);
    console.log(res);
    setPackage(res.data.body.packages);
    setLoading(false);
  };

  const deletePackage = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/packages/${id}`);
      message.success(`Occassion successfully Deleted`);
      loadPackage(lang);
    } catch (err) {
      message.error(`Something went wrong`);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
      >
        <Title style={{ fontSize: "32px", fontWeight: "bold" }}>Packages</Title>
        <Button type="primary" onClick={showModal}>
          Add Package
        </Button>
      </div>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Language"
        optionFilterProp="children"
        onChange={onChange}
        defaultValue="en"
      >
        <Option value="en">English</Option>
        <Option value="ar">Arabic</Option>
      </Select>
      <br />
      <br />

      <Modal
        title="Create Package"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreatePackage />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Package"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditPackage item={editModal.data} />
        </Modal>
      )}

      <div className="package-div">
        {packages.map((item, key) => {
          return (
            <div key={key} className="item">
              <h1>{item.title}</h1>
              {/* <img src={item.occasion.thumbnails} alt="ocations"/> */}
              <h1>
                <b>AED {item.price.AED}</b>{" "}
              </h1>
              <div>
                <ul>
                  {item.benefits.map((item, key) => {
                    return <li key={key}>{item.title}</li>;
                  })}
                </ul>
              </div>
              <div className="designAction">
                <div
                  className="deleteIcon"
                  onClick={() => {
                    deletePackage(item._id);
                  }}
                >
                  <DeleteOutlined style={{ color: "red" }} />
                </div>
                <div
                  style={{ marginRight: ".5rem", cursor: "pointer" }}
                  onClick={() => {
                    showEditModal(item);
                  }}
                >
                  <EditOutlined style={{ color: "red" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackagesPage;
