import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import HomeCards from './HomeCards';
import { Grid, Text } from "@nextui-org/react";
import { Card5 } from './Card5';
import { Card1 } from './Card1';
import { Card3 } from './Card3';
import { Card2 } from './Card2';
import { Card4 } from './Card4';

interface ErrorResponse {
  message: string;
}
type Acc = {
  firstName: string;
  lastName: string;
  email : string;
  phoneNumber: string;
  balance: number;
};


function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [userInfo, setUserInfo] = useState<Acc | null>(null);
 
  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/auth/userinfo', {
              headers: {
                  Authorization: `${localStorage.getItem('token')}`
              },
          });
        setUserInfo(response.data)
        localStorage.setItem("userData", JSON.stringify(response.data));
        const dt=(localStorage.getItem("userData"));
        const dtObj = dt ? JSON.parse(dt) : null;
        console.log(dtObj.firstName)
      } catch (error) {
        setError(error as ErrorResponse);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading user info...</div>;
  }

  if (error) {
    return <div>{error? null: error}</div>;
  }

  return (
    <div>
      <>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Welcome
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        {userInfo?.firstName} {userInfo?.lastName}
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
      </Text>
    </>
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={4}>
        <Card1 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card3 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card2 />
      </Grid>
      <Grid xs={12} sm={5}>
        <Card4 />
      </Grid>
      <Grid xs={12} sm={7}>
        <Card5 />
      </Grid>
    </Grid.Container>
    </div>
    
  );
}

export default HomePage;