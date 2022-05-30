import React, { useState, useEffect } from "react";
import { Typography, Button, Select, Modal, message, Spin } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import AddSlideShow from "./createSlideshow";
import "./slideshow.css";
import EditSlideShow from "../../components/slideshow/editSlideShow";
const { Option } = Select;

const SliderShow = () => {
  const { Title } = Typography;

  const [slideshow, setSlideShow] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lang, setLang] = useState("en");
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  useEffect(() => {
    loadSlideShow(lang);
  }, []);

  const loadSlideShow = async (value) => {
    let res = await axios.get(`/api/v1/slideshows?lang=${value}`);
    console.log(res);
    setSlideShow(res.data.body.slideshows);
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
    loadSlideShow(lang);
  };

  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadSlideShow(lang);
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
    loadSlideShow(value);
  };
  const deleteSlideShow = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/slideshows/${id}`);
      message.success(`Occassion successfully Deleted`);
      loadSlideShow(lang);
    } catch (err) {
      message.error(`Something went wrong`);
    }
  };

  const Preview = () => {
    return <p>Loading</p>;
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
        <Title style={{ fontSize: "32px", fontWeight: "bold" }}>
          Slideshow
        </Title>
        <Button type="primary" onClick={showModal}>
          Slideshow
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
        title="Create Slideshow"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddSlideShow />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Package"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditSlideShow item={editModal.data} />
        </Modal>
      )}

      <div className="slideshow-div">
        {slideshow.map((item, key) => {
          return (
            <div className="youtubePlayer">
              <ReactPlayer url={item.URL} fallback={<Preview />} width="100%" />
              <div>
                <div className="slideshowAction">
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        showEditModal(item);
                      }}
                    >
                      <EditOutlined style={{ color: "red" }} />
                    </div>
                    <b>
                      {item.package !== null
                        ? item.package
                          ? item.package.title
                          : item.package.title
                        : null}
                    </b>
                  </div>
                  <div
                    className="deleteIcon"
                    onClick={() => {
                      deleteSlideShow(item._id);
                    }}
                  >
                    <DeleteOutlined style={{ color: "red" }} />
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

export default SliderShow;
