import React from "react";
import { Card, Typography, Breadcrumb } from "antd";
import "./package.styles.css";
import CustomButton from "../custom-button/custom-button.component";
import { useHistory } from "react-router-dom";

// {
//       name: 'Free',
//       adv: 'Best for trying out',
//       price: '0',
//       currency: 'AED',
//       benfits: ['benefet1, 2, 3'],
//     }

const Package = ({ pack }) => {
  const { Title, Text } = Typography;
  const history = useHistory();

  const handleNextButtonClick = (e) => {
    return history.push(`/package/${pack.name}`, { pack: pack });
  };

  const menu = <Text> </Text>;

  return (
    <div className="site-card-border-less-wrapper">
      <Card bordered={false}>
        <Title level={3} style={{ margin: 0 }}>
          {pack.title}
        </Title>
        <div style={{ paddingBottom: "2rem" }}>
          <Text type="secondary">{pack.adv}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={4} strong>
            {pack.currency} {pack.price}
            <Text style={{ color: "#000000d9", fontWeight: "normal" }}>
              {" "}
              / Month{" "}
            </Text>
          </Title>{" "}
        </div>

        <div
          style={{
            marginBottom: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "200px",
          }}
        >
          {pack.benfits.map((ben) => {
            return (
              <Breadcrumb.Item separator="" key={ben} overlay={menu}>
                <a href=""> {ben} </a>
              </Breadcrumb.Item>
            );
          })}
        </div>
        <div className="button-container">
          <CustomButton
            customStyle={{ position: "absolute", bottom: "-28px" }}
            buttonText="Edit Package"
            withHoveringEffect={true}
            onClickListener={handleNextButtonClick}
          />
        </div>
      </Card>
    </div>
  );
};

export default Package;
