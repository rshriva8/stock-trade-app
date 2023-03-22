import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import React from "react";

export const Card4 = () => (
  <Card css={{ w: "100%", h: "400px" }}isPressable isHoverable onClick={() => handleCardClick("/stocks")}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Start Trading
        </Text>
        <Text h1 color="white">
          Explore Stocks
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://m.foolcdn.com/media/dubs/original_images/Intro_slide_-_digital_stock_chart_going_up_-_source_getty.jpg"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
  </Card>
);
const handleCardClick = (url:string) => {
  window.location.href = url;
};
