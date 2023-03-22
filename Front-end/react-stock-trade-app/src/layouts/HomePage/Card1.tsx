import { Card, Col, Text } from "@nextui-org/react";
import { redirect } from "next/dist/server/api-utils";
import React from "react";


export const Card1 = () => (
  <Card isPressable isHoverable  onClick={() => handleCardClick("/account")}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Edit your Account
        </Text>
        <Text h1 color="white">
          My Profile
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-4.jpeg"
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
  </Card>
);
const handleCardClick = (url:string) => {
  window.location.href = url;
};

