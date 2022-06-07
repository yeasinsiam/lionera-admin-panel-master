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
      title: "Status",
      key: "status",
      render: (order) => (
        <button
          style={{
            border: "none",
            backgroundColor: "inherit",
            cursor: "pointer",
          }}
          // onClick={() => {
          //   return (
          //     order.status === "Incomplete" &&
          //     history.push(`/order-details/${order.orderId}`)
          //   );
          // }}
          onClick={() => {
            return history.push(`/order-details/${order.orderId}`);
          }}
        >
          {/* <Text
            type={order.status === "complete" ? "success" : "danger"}
            style={{ paddingRight: "6px" }}
          >
            {order.status}
          </Text> */}
          {order.status === "pending" ? (
            <Tag color="red">Pending</Tag>
          ) : (
            <Tag color="green">Success</Tag>
          )}
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
