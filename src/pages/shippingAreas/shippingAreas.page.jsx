import React, { useState, useEffect } from "react";
import { Spin, Typography, Modal, Button, message } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddShippingArea from "./addShippingArea";
import EditShippingArea from "./editShippingArea";

const ShippingAreasPage = () => {
  const [shippingAreas, setShippingAreas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  const showModal = () => {
    setIsCreateModalVisible(true);
  };
  const showEditModal = (item) => {
    setEditModal({
      visible: true,
      data: item,
    });
  };

  const handleCreateModalOk = () => {
    setIsCreateModalVisible(false);
    loadShippingAreas();
  };
  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadShippingAreas();
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalVisible(false);
  };
  const handleEditCancel = () => {
    setEditModal({
      visible: false,
      data: null,
    });
  };

  useEffect(() => {
    loadShippingAreas();
  }, []);

  const loadShippingAreas = async () => {
    let res = await axios.get(`/api/v1/shipping-areas`);
    console.log(res);
    setShippingAreas(res.data.body.shippingAreas);
    setLoading(false);
  };

  const deleteShippingAreas = async (id) => {
    try {
      await axios.delete(`/api/v1/shipping-areas/${id}`);
      message.success(`Shipping area successfully Deleted`);
      loadShippingAreas();
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
          Shipping Areas
        </Typography.Title>
        <Button type="primary" onClick={showModal}>
          Add Shipping Area
        </Button>
      </div>
      <Modal
        title="Add Shipping Area"
        visible={isCreateModalVisible}
        onOk={handleCreateModalOk}
        onCancel={handleCreateModalCancel}
      >
        <AddShippingArea />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Shipping Area"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditShippingArea item={editModal.data} />
        </Modal>
      )}

      <br />
      <br />

      <div className="occationsTable">
        <table>
          <tr>
            {/* <th>{lang === "ar" ? "Arabic Title" : "English Title"}</th> */}
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {shippingAreas.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.name}</td>
                <td>AED {item.price.AED}</td>

                <td style={{ display: "flex", padding: "14px 0" }}>
                  <div>
                    <EditOutlined
                      onClick={() => showEditModal(item)}
                      style={{ marginRight: ".5rem", color: "#dd0d51" }}
                    />
                  </div>
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      deleteShippingAreas(item._id);
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

export default ShippingAreasPage;
