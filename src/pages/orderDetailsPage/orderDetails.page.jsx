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
  const [order, setOrder] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      let res = await axios.get(`/api/v1/orders/${orderId}`);
      setOrder(res.data.body.order);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Spin />;
  }

  const handleChangeOrderStatus = async (value) => {
    setOrderStatusLoading(true);

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

  console.log(order);
  return (
    <div style={{ paddingTop: "6rem" }}>
      <Typography.Title level={3} style={{ fontWeight: "bold" }}>
        {" "}
        Order Details{" "}
      </Typography.Title>
      <Card style={{ marginTop: "4rem" }}>
        <Row
          gutter={[50, 20]}
          // gutter={{
          //   xs: 0,
          //   // sm: 0,
          //   md: 50,
          // }}
        >
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
          <Col className="gutter-row" xs={24} md={6}>
            <span>
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
            {" "}
            Video Design
          </Typography.Title>
          <Card style={{ width: 400 }}>
            {/* <ImageCard imgSrc={order.slideshow.URL} /> */}
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
      </div>
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
