import React, { useState, useEffect } from "react";
import { Typography, Spin, Select, Modal, message } from "antd";
import { Button, Tag } from "antd";
import axios from "axios";
import "./designs.css";
import AddDesign from "./addDesig";
import Gallery from "./gallery";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditDesign from "../../components/design/EditDesign";

const PlaceTag = (props) => {
  const { tag } = props;
  if (tag === "ar") {
    return <Tag color="green">Arabic</Tag>;
  }
  if (tag === "en") {
    return <Tag color="Gold">English</Tag>;
  }
  if (tag === "both") {
    return <Tag color="blue">Both</Tag>;
  }
};

const DesignPage = () => {
  const [designs, setDesign] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGallery, setGallery] = useState(false);
  const [gallery, setGalleryData] = useState([]);
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  const [lang, setLang] = useState("en");
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
    setGallery(false);
  };
  const showEditModal = (item) => {
    setEditModal({
      visible: true,
      data: item,
    });
  };

  const showGallery = (data) => {
    setGalleryData(data);
    setIsModalVisible(true);
    setGallery(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    loadDesign(lang);
  };

  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadDesign(lang);
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
    loadDesign("en");
  }, []);

  const onChange = (value) => {
    setLang(value);
    loadDesign(value);
  };

  const loadDesign = async (value) => {
    let res = await axios.get(`/api/v1/designs?lang=${value}`);
    setDesign(res.data.body.designs);
    setLoading(false);
  };

  const deleteDesign = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/designs/${id}`);
      message.success(`Occassion successfully Deleted`);
      loadDesign(lang);
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
          Designs
        </Typography.Title>
        <Button type="primary" onClick={showModal}>
          Add Design
        </Button>
      </div>

      <Modal
        title={isGallery ? "Gallery" : "Add a Design "}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isGallery ? <Gallery gallery={gallery} /> : <AddDesign />}
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Design"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditDesign item={editModal.data} />
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

      <div className="designGallery">
        {designs.map((item, key) => {
          return (
            <div className="design_item">
              <img
                src={item.gallery[0].url}
                alt="desgin"
                onClick={() => {
                  showGallery(item.gallery);
                }}
              />
              <div className="content">
                {item.occasion !== null || undefined ? (
                  <p>
                    {(item.occasion.en && item.occasion.en.title) ||
                      item.occasion.title}
                  </p>
                ) : (
                  <p>Occassion Deleted</p>
                )}
                <div className="designAction">
                  <PlaceTag tag={item.lang} />
                  <div className="designAction">
                    <div
                      style={{ marginRight: ".5rem", cursor: "pointer" }}
                      onClick={() => {
                        showEditModal(item);
                      }}
                    >
                      <EditOutlined style={{ color: "red" }} />
                    </div>
                    <div
                      className="deleteIcon"
                      onClick={() => {
                        deleteDesign(item._id);
                      }}
                    >
                      <DeleteOutlined style={{ color: "red" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignPage;
