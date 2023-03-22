import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import React from "react";

export const Card5 = () => (
  <Card css={{ w: "100%", h: "400px" }}isPressable isHoverable onClick={() => handleCardClick("/myportfolio")}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
          Manage Stocks You Own
        </Text>
        <Text h1 color="white">
          My Portfolio
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://www.thebalancemoney.com/thmb/uqGy4K5NK4ngdmiFSw7_50ChBg4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/businessman-using-laptop-for-analyzing-data-stock-market--forex-trading-graph--stock-exchange-trading-online--financial-investment-concept--all-on-laptop-screen-are-design-up--1069549614-dff6e981e4f0486b8ca135656c107281.jpg"
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
  </Card>
);
const handleCardClick = (url:string) => {
  window.location.href = url;
};
