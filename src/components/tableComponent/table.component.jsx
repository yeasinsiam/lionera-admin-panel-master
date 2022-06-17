import React from "react";

import { Table, Tag, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const TableComponent = ({ data, tableSort }) => {
  console.log(data);

  const history = useHistory();

  const handleEditButtonClick = (ocassion) => {
    return history.push(`/edit/${ocassion._id}`, { ocassion: ocassion });
  };

  const OccasionsColumns = [
    {
      title: "English Title",
      dataIndex: ["en", "title"],
      key: "name",
      width: "20rem",
    },
    { title: "Arabic Title", dataIndex: ["ar", "title"], key: "#ofImages" },
    { title: "Lanague", dataIndex: ["lang"], key: "#ofImages" },

    {
      title: "",
      key: "operation",
      render: (ocassion) => (
        <button
          style={{
            color: "#dd0d51",
            border: "none",
            backgroundColor: "inherit",
          }}
          onClick={(e) => handleEditButtonClick(ocassion)}
        >
          {" "}
          Edit{" "}
        </button>
      ),
      align: "right",
    },
  ];

  const AddOnsColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "",
      key: "operation",
      render: () => <a> Edit </a>,
      align: "right",
    },
  ];

  const OrderManagersColumns = [
    { title: "Order #", dataIndex: "orderId", key: "orderId" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
    { title: "Add-Ons", dataIndex: "addons", key: "addons" },
    { title: "Package", dataIndex: "package", key: "package" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Financial Status",
      key: "financial_status",
      render: (order) => (
        <button
          style={{
            border: "none",
            backgroundColor: "inherit",
            cursor: "pointer",
          }}
        >
          {(order.financial_status === "paid" && (
            <Tag color="green">Paid</Tag>
          )) ||
            (order.financial_status === "unpaid" && (
              <Tag color="red">Unpaid</Tag>
            )) ||
            (order.financial_status === "refund" && (
              <Tag color="orange">Refund</Tag>
            ))}
        </button>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (order) => (
        <button
          style={{
            border: "none",
            backgroundColor: "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            return history.push(`/order-details/${order.orderId}`);
          }}
        >
          <Tag
            color={
              (order.status === "pending" && "magenta") ||
              (order.status === "canceled" && "red") ||
              (order.status === "refund" && "orange") ||
              (order.status === "delivered" && "green")
            }
            style={{ textTransform: "capitalize" }}
          >
            {order.status}
          </Tag>
          <EditOutlined />
        </button>
      ),
    },
  ];

  const { Text } = Typography;

  return (
    <div>
      <Table
        className="components-table-demo-nested"
        columns={
          tableSort === "ocassionsTable"
            ? OccasionsColumns
            : tableSort === "addonsTable"
            ? AddOnsColumns
            : OrderManagersColumns
        }
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;
