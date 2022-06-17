import { Col, Row, Spin, Typography, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/tableComponent/table.component";
import { formatDate } from "../../helpers/others";

const OrderManager = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOrderSearchingLoading, setIsOrderSearchingLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async (search = "") => {
    try {
      let res = await axios.get(`/api/v1/orders?search=${search}`);
      console.log(res.data.body.orders);
      setTableData(res.data.body.orders);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    const { value: inputValue } = e.target;
    setIsOrderSearchingLoading(true);
    await loadOrders(inputValue);
    setIsOrderSearchingLoading(false);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <Row gutter={[50, 20]}>
        <Col className="gutter-row" xs={24} md={16}>
          <Typography.Title level={3} style={{ fontWeight: "bold" }}>
            Order Manager
          </Typography.Title>
        </Col>
        <Col className="gutter-row" xs={24} md={8}>
          <Input.Search
            placeholder="Search with order id or email"
            onChange={handleSearch}
            enterButton
            loading={isOrderSearchingLoading}
          />
        </Col>
      </Row>
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
      total: `AED ${data.prices.AED.totalPrice}`,
      financial_status: data.financial_status,
      status: data.order_status,
    });

    return carry;
  }, []);
};

//

export default OrderManager;
