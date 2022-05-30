import React, { useState, useEffect } from "react";
import { Spin, Typography, Modal, Button, Select, message } from "antd";
import axios from "axios";
import "./occasion.css";
import AddOccastion from "./addOccations";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditOccations from "./editOccations";

const OcassionsPage = () => {
  const [occasions, setOccastion] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });
  const [lang, setLang] = useState("en");

  const { Option } = Select;

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
    console.log(lang);
    loadOccations(lang);
  };
  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadOccations(lang);
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

  useEffect(() => {
    loadOccations("en");
  }, []);

  const loadOccations = async (value = "both") => {
    const url =
      "both" === value
        ? `/api/v1/occasions`
        : `/api/v1/occasions?lang=${value}`;
    let res = await axios.get(url);
    console.log(res);
    setOccastion(res.data.body.occasions);
    setLoading(false);
  };

  const onChange = (value) => {
    setLang(value);
    loadOccations(value);
  };

  const deleteOccassion = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/occasions/${id}`);
      message.success(`Occassion successfully Deleted`);
      loadOccations(lang);
    } catch (err) {
      message.error(`Something went wrong`);
    }
  };

  if (isLoading) {
    return <Spin />;
  }
  return (
    <div style={{ paddingTop: "6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ fontWeight: "bold" }}>
          Occations
        </Typography.Title>
        <Button type="primary" onClick={showModal}>
          Add Occations
        </Button>
      </div>
      <Modal
        title="Add Occassion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddOccastion />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Occassion"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditOccations item={editModal.data} />
        </Modal>
      )}

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
        <Option value="both">Both</Option>
      </Select>
      <br />
      <br />

      <div className="occationsTable">
        <table>
          <tr>
            <th>{lang === "ar" ? "Arabic Title" : "English Title"}</th>
            <th>Language</th>
            <th>Thumnails</th>
            <th>Actions</th>
          </tr>
          {occasions.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.en ? item.en.title : item.title}</td>
                <td>{item.lang}</td>
                <td>
                  <div className="OccationsThumnails">
                    <img src={item.thumbnails} alt="occation_thumbnails" />
                  </div>
                </td>
                <td style={{ display: "flex" }}>
                  <div>
                    <Link
                      to={`/ocassions/edit/${item._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                      style={{ marginRight: ".5rem" }}
                    >
                      <EditOutlined />
                    </Link>
                  </div>
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      deleteOccassion(item._id);
                    }}
                  >
                    <DeleteOutlined style={{ color: "red" }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default OcassionsPage;
