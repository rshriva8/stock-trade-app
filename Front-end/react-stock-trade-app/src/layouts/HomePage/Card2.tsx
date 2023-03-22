import { Card, Col, Text } from "@nextui-org/react";
import React from "react";

export const Card2 = () => (
  <Card css={{ w: "100%" }}isPressable isHoverable onClick={() => handleCardClick("/mylimitorders")}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Check up with your booked orders
        </Text>
        <Text h1 color="white">
          Limit Orders
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-3.jpeg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);
const handleCardClick = (url:string) => {
  window.location.href = url;
};

