import { Typography, Card, Spin, Select, Row, Col, message } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import ImageCard from "../../components/imageCard/imageCard.component";
import { formatDate } from "../../helpers/others";
import ReactPlayer from "react-player";

const OrderDetailsPage = () => {
  const { Text } = Typography;
  const [isLoading, setLoading] = useState(true);
  const [orderStatusLoading, setOrderStatusLoading] = useState(false);
  const [finantialStatusLoading, setFinantialStatusLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderFromData, setOrderFromData] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      loadOrder();
      // loadOrderFormData();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      let orderRes = await axios.get(`/api/v1/orders/${orderId}`);
      setOrder(orderRes.data.body.order);
      let orderFormDatares = await axios.get(`/api/v1/form-data/${orderId}`);
      setOrderFromData(
        orderFormDatares.data.body.formData
          ? Object.entries(orderFormDatares.data.body.formData.data)
          : null
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  const handleChangeOrderStatus = async (value) => {
    setFinantialStatusLoading(true);

    const body = {
      order_status: value,
    };
    try {
      await axios.put(`/api/v1/orders/${order._id}`, {
        ...body,
      });
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
    setOrderStatusLoading(false);
  };

  const handleChangeFinaltialStatus = async (value) => {
    setOrderStatusLoading(true);

    const body = {
      financial_status: value,
    };
    try {
      await axios.put(`/api/v1/orders/${order._id}`, {
        ...body,
      });
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong, Refresh and try again`);
    }
    setOrderStatusLoading(false);
  };

  return (
    <div style={{ paddingTop: "6rem" }}>
      <Typography.Title level={3} style={{ fontWeight: "bold" }}>
        {" "}
        Order Details{" "}
      </Typography.Title>
      <Card style={{ marginTop: "4rem" }}>
        <Row gutter={[50, 20]}>
          <Col className="gutter-row" xs={24} md={6}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Order#:{" "}
              </Text>
              <Text> {order._id} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={6}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Order Date:{" "}
              </Text>
              <Text> {formatDate(order.createdAt)} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={6}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Package:{" "}
              </Text>
              <Text> {order.package.title} </Text>
            </span>
          </Col>
          <Col
            className="gutter-row"
            xs={24}
            md={6}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span style={{ marginBottom: "1rem" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  marginRight: ".5rem",
                }}
              >
                Status:
              </Text>
              <Select
                defaultValue={order.order_status}
                loading={orderStatusLoading}
                onChange={handleChangeOrderStatus}
              >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="delivered">Delivered</Select.Option>
                <Select.Option value="canceled">Canceled</Select.Option>
                <Select.Option value="refund">Refund</Select.Option>
              </Select>
            </span>
            <span>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  marginRight: ".5rem",
                }}
              >
                Financial Status:
              </Text>
              <Select
                defaultValue={order.financial_status}
                loading={finantialStatusLoading}
                onChange={handleChangeFinaltialStatus}
              >
                <Select.Option value="unpaid">Unpaid</Select.Option>
                <Select.Option value="paid">Paid</Select.Option>
                <Select.Option value="refund">Refund</Select.Option>
              </Select>
            </span>
          </Col>
        </Row>
      </Card>

      <Typography.Title
        level={3}
        style={{
          paddingTop: "2rem",
          paddingBottom: "0",
          fontWeight: "bold",
          paddingTop: "4rem",
        }}
      >
        User Details:
      </Typography.Title>

      <Card>
        <Row gutter={[50, 20]} style={{ paddingBottom: "1rem" }}>
          <Col className="gutter-row" xs={24} md={8}>
            <span style={{ paddingRight: "6rem" }}>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                User Name:
              </Text>
              <Text>{order.shipping.name}</Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Email Adress:{" "}
              </Text>
              <Text>{order.shipping.email}</Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <span style={{ paddingRight: "7rem" }}>
              <Text style={{ fontWeight: "bold", color: "black" }}>Phone:</Text>
              <Text>
                +{order.shipping.areaCode}-{order.shipping.phone}
              </Text>
            </span>
          </Col>
        </Row>

        <Row gutter={[50, 20]} style={{ paddingBottom: "1rem" }}>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Shipping Adress Line One:
              </Text>
              <br />
              <Text> {order.shipping.addressLine1} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Shipping Adress Line Two:
              </Text>
              <br />
              <Text> {order.shipping.addressLine2} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                Country:{" "}
              </Text>
              <Text> {order.shipping.country} </Text>
            </span>
          </Col>
        </Row>

        <Row gutter={[50, 20]} style={{ paddingBottom: "1rem" }}>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                City:{" "}
              </Text>
              <Text> {order.shipping.city} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <span>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {" "}
                State:{" "}
              </Text>
              <Text> {order.shipping.state} </Text>
            </span>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {" "}
              Zip Code:{" "}
            </Text>
            <Text> {order.shipping.zip} </Text>
          </Col>
        </Row>
      </Card>

      <Card>
        <Row gutter={[50, 20]} style={{ paddingBottom: "1rem" }}>
          <Col className="gutter-row" xs={24} md={8}>
            <Typography.Title
              style={{
                marginTop: "3rem",
                fontWeight: "bold",
                marginTop: "3rem",
              }}
              level={3}
            >
              {" "}
              Card Design
            </Typography.Title>
            <Card style={{ width: 400 }}>
              {order.design.gallery.map((item) => (
                <ImageCard imgSrc={item.url} />
              ))}
            </Card>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <Typography.Title
              style={{
                marginTop: "3rem",
                fontWeight: "bold",
                marginTop: "3rem",
              }}
              level={3}
            >
              Video Design
            </Typography.Title>
            <Card style={{ width: "100%" }}>
              <ReactPlayer
                url={order.slideshow.URL}
                fallback={<p>Loading</p>}
                width="100%"
              />
            </Card>
          </Col>
          <Col className="gutter-row" xs={24} md={8}>
            <Typography.Title
              style={{ marginTop: "3rem", fontWeight: "bold" }}
              level={3}
            >
              Price Breakdown
            </Typography.Title>
            <Card style={{ width: 400, marginTop: 0, minHeight: 400 }}>
              <div>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Package:
                </Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>{order.package.title}</Text>
                <Text> AED {order.package.price.AED} </Text>
              </div>

              {order.addons.map((addon) => (
                <>
                  <div style={{ paddingTop: "2rem" }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Add-Ons:
                    </Text>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>{addon.title}</Text>
                    <Text>
                      {addon.currency} {addon.price}
                    </Text>
                  </div>
                </>
              ))}
            </Card>
          </Col>
        </Row>
      </Card>

      <Card>
        <h1>Uploaded Form Data</h1>
        <br />
        {orderFromData ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            {orderFromData.map((item, key) => {
              return (
                <tr style={{ borderBottom: "1px solid #ddd;" }}>
                  <td style={{ padding: "10px 0" }}>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <span>No form data uploaded yet</span>
        )}
      </Card>
      {/* 
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <Typography.Title
            style={{ marginTop: "3rem", fontWeight: "bold", marginTop: "3rem" }}
            level={3}
          >
            {" "}
            Card Design
          </Typography.Title>
          <Card style={{ width: 400 }}>
            {order.design.gallery.map((item) => (
              <ImageCard imgSrc={item.url} />
            ))}
          </Card>
          <Typography.Title
            style={{ marginTop: "3rem", fontWeight: "bold", marginTop: "3rem" }}
            level={3}
          >
            Video Design
          </Typography.Title>
          <Card style={{ width: 400 }}>
            <ReactPlayer
              url={order.slideshow.URL}
              fallback={<p>Loading</p>}
              width="100%"
            />
          </Card>
        </span>
        <span>
          <Typography.Title
            style={{ marginTop: "3rem", fontWeight: "bold" }}
            level={3}
          >
            Price Breakdown
          </Typography.Title>
          <Card style={{ width: 400, marginTop: 0, minHeight: 400 }}>
            <div>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Package:
              </Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>{order.package.title}</Text>
              <Text> AED {order.package.price.AED} </Text>
            </div>

            {order.addons.map((addon) => (
              <>
                <div style={{ paddingTop: "2rem" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Add-Ons:
                  </Text>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>{addon.title}</Text>
                  <Text>
                    {addon.currency} {addon.price}
                  </Text>
                </div>
              </>
            ))}
          </Card>
        </span>
      </div> */}
      {/* <div style={{ paddingTop: "4rem" }}>
        <Typography.Title level={3}> AddOns </Typography.Title>
        <Checkbox checked={true} style={{ color: "black" }}>
          {" "}
          Personalised Message{" "}
        </Checkbox>
        <div style={{ width: "300px", paddingTop: "1rem" }}>
          <Text>
            {" "}
            This is the personal message that the user has orderd to be in mhis
            card{" "}
          </Text>
        </div>
      </div> */}
    </div>
  );
};

export default OrderDetailsPage;
