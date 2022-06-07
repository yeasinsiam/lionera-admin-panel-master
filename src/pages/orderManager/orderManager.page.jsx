import { Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/tableComponent/table.component";
import { formatDate } from "../../helpers/others";

const OrderManager = () => {
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      let res = await axios.get(`/api/v1/orders`);
      console.log(res.data.body.orders);
      setTableData(res.data.body.orders);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <div>
        <Typography.Title level={3} style={{ fontWeight: "bold" }}>
          Order Manager
        </Typography.Title>
      </div>
      <TableComponent data={formatDataTable(tableData)} />
    </div>
  );
};

const formatDataTable = (tableData) => {
  return tableData.reduce((carry, data, index) => {
    carry.push({
      key: `${index + 1}`,
      orderId: data._id,
      orderDate: formatDate(data.createdAt),
      addons: data.addons.length ? "Yes" : "No",
      package: data.package.title,
      total: `AED ${totalPrice(data)}`,
      financial_status: data.financial_status,
      status: data.order_status,
    });

    return carry;
  }, []);
};

const totalPrice = (data) => {
  const addonsTotal = data.addons.reduce((carry, item) => {
    carry += parseInt(item.price);
    return carry;
  }, 0);
  const packagePrice = parseInt(data.package.price.AED);
  return addonsTotal + packagePrice;
};

export default OrderManager;
