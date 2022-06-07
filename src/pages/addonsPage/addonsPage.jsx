import React, { useState, useEffect } from "react";
import { Typography, Spin, Modal, message } from "antd";
import { Button } from "antd";
import axios from "axios";
import CreateAddon from "./createAddons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditAddons from "../../components/addons/editAddons";

const AddonsPage = () => {
  const [addOns, setAddons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  useEffect(() => {
    loadAddons();
  }, []);

  const loadAddons = async () => {
    let res = await axios.get("/api/v1/addons?lang=both");
    console.log(res);
    setAddons(res.data.body.addons);
    setLoading(false);
  };

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
    loadAddons();
  };

  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadAddons();
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

  const deleteAddons = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/addons/${id}`);
      message.success(`Addons successfully Deleted`);
      loadAddons(lang);
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
          Add-Ons
        </Typography.Title>
        <Button type="primary" onClick={showModal}>
          Add Addons
        </Button>
      </div>

      <Modal
        title="Add Addons"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateAddon />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Package"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditAddons item={editModal.data} />
        </Modal>
      )}

      <div className="formDiv">
        <table>
          <tr>
            <th>Arabic Title</th>
            <th>English Title</th>
            <th>Price</th>
            <th>Input Type</th>
            <th>Action</th>
          </tr>
          {addOns.map((item, key) => {
            return (
              <tr>
                <td>{item.ar !== undefined ? item.ar.title : null}</td>
                <td>{item.en !== undefined ? item.en.title : null}</td>
                <td>{item.price}</td>
                <td>{item.inputType}</td>
                <td style={{ display: "flex" }}>
                  <div
                    style={{ marginRight: "1rem", cursor: "pointer" }}
                    onClick={() => showEditModal(item)}
                  >
                    <EditOutlined style={{ color: "red" }} />
                  </div>
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      deleteAddons(item._id);
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

export default AddonsPage;
