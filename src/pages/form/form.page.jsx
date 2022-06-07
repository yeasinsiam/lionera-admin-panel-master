import React, { useState, useEffect } from "react";
import { Typography, Button, Select, Modal, Spin, message } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateForm from "./createForm";

import "./form.css";
import EditForm from "../../components/form/editForm";

const { Option } = Select;

const Form = () => {
  const { Title } = Typography;
  const [lang, setLang] = useState("en");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [forms, setForm] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({
    visible: false,
    data: null,
  });

  useEffect(() => {
    loadForm("both");
    loadPackages("en");
  }, []);

  const loadForm = async (lang, packageId = "") => {
    let res = packageId
      ? await axios.get(`/api/v1/forms?lang=${lang}&packageId=${packageId}`)
      : await axios.get(`/api/v1/forms?lang=${lang}`);
    // console.log(res);
    setForm(res.data.body.forms);
    setLoading(false);
  };

  const loadPackages = async (lang) => {
    try {
      let res = await axios.get(`/api/v1/packages?lang=${lang}`);
      setPackages(res.data.body.packages);
    } catch {
      alert("Something went wrong");
    }
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
    loadForm("both");
    loadForm("both", selectedPackage);
  };

  const handleEditOk = () => {
    setEditModal({
      visible: false,
      data: null,
    });
    loadForm("both", selectedPackage);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLangChange = (value) => {
    setLang(value);
    loadPackages(value);
    setSelectedPackage(null);
    loadForm("both");
  };
  const handlePackageChange = (packageId) => {
    setSelectedPackage(packageId);
    loadForm("both", packageId);
  };

  const handleEditCancel = () => {
    setEditModal({
      visible: false,
      data: null,
    });
  };

  const deleteForm = async (id) => {
    try {
      let res = await axios.delete(`/api/v1/forms/${id}`);
      message.success(`Occassion successfully Deleted`);
      loadForm("both");
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
        <Title style={{ fontSize: "32px", fontWeight: "bold" }}>Form</Title>
        <Button type="primary" onClick={showModal}>
          Add Form
        </Button>
      </div>

      <Select
        showSearch
        style={{ width: 200, marginRight: "1rem" }}
        placeholder="Select a Language"
        optionFilterProp="children"
        onChange={handleLangChange}
        defaultValue="en"
      >
        <Option value="en">English</Option>
        <Option value="ar">Arabic</Option>
      </Select>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Filter by Package"
        optionFilterProp="children"
        onChange={handlePackageChange}
        value={selectedPackage}
      >
        {packages.map((item, key) => {
          return (
            <Select.Option key={key} value={item._id}>
              {item.title}
            </Select.Option>
          );
        })}
      </Select>

      <br />
      <br />

      <Modal
        title="Create Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateForm />
      </Modal>

      {editModal.data && (
        <Modal
          title="Edit Package"
          visible={editModal.visible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <EditForm item={editModal.data} />
        </Modal>
      )}

      <div className="formDiv">
        <table>
          <tr>
            <th>Title</th>
            <th>Lable</th>
            <th>Input type</th>
            <th>Action</th>
          </tr>
          {console.log(forms)}
          {forms.map((item, key) => {
            return (
              <tr>
                <td>{"en" === lang ? item.en.title : item.ar.title}</td>
                <td>{"en" === lang ? item.en.label : item.ar.label}</td>
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
                      deleteForm(item._id);
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

export default Form;
