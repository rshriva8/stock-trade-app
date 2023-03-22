
import { Card, Grid, Link } from '@nextui-org/react';
import React from 'react';
function HomeCards() {
const handleCardClick = (url:string) => {
    window.location.href = url;
return (
    
    <Grid.Container gap={5}>
      <Grid sm={12} md={5}>
        <Card isPressable
        isHoverable
        variant="bordered"
        css={{ mw: "200px" }}
        onClick={() => handleCardClick("/admin/register-stock")}>
          <Card.Body>
            <Link href="/admin/register-stock">Register New Stock</Link>
          </Card.Body>
        </Card>
        </Grid>
      <Grid sm={12} md={5}>
        <Card isPressable
        isHoverable
        variant="bordered"
        css={{ mw: "200px" }}
        onClick={() => handleCardClick("/admin/set-market")}>
          <Card.Body>
            <Link href="/admin/set-market">Set Market Schedule</Link>
          </Card.Body>
        </Card>
        </Grid>
      <Grid sm={12} md={5}>
        <Card isPressable
        isHoverable
        variant="bordered"
        css={{ mw: "200px" }}
        onClick={() => handleCardClick("/admin/manage-stocks")}>
          <Card.Body>
            <Link href="/admin/manage-stocks">Manage Existing Stocks</Link>
          </Card.Body>
        </Card>
        </Grid>
    </Grid.Container>
  );
}}
export default HomeCards;