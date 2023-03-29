import React, { useEffect, useState } from "react"
import { Navbar, Button, Link, Text, Dropdown, red } from "@nextui-org/react";
import { NavLink } from "react-router-dom"
import { isLoggedIn } from '../Auth/index'
import { NavItem } from "react-bootstrap";
import NavbarItem from "@nextui-org/react/types/navbar/navbar-item";
import axios from "axios";

export const Nav = () => {
  const [login, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bal, setBal] =useState(0);
  useEffect(() => {
    setLogin(isLoggedIn())
    const dt = (localStorage.getItem("userData"));
    const dtObj = dt ? JSON.parse(dt) : null;
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/userinfo', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          },
        });
        localStorage.setItem("userData", JSON.stringify(response.data));
        const dt = (localStorage.getItem("userData"));
        const dtObj = dt ? JSON.parse(dt) : null;
        if (dtObj.roles.length == 2) setIsAdmin(true);
        console.log(dtObj.firstName)
        setBal(dtObj.balance);
      } catch (error) {
        console.log(error)
      }
    };
    fetchUserInfo();
    
  }, [login])
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/landing'

  }
  return (
    <Navbar isCompact isBordered variant="floating">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Stock Trading Application
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs">
        <Navbar.Link href="/home">Home</Navbar.Link>
        {isAdmin && (
          <NavItem>
            <Navbar.Link isActive href="/admin">Admin</Navbar.Link>
          </NavItem>
        )}
        <Navbar.Link href="/stocks">Stocks</Navbar.Link>
      </Navbar.Content>
      {
        login && (
          <NavItem>
            <Navbar.Content>
              <Navbar.Link color="inherit" href="/myportfolio">
                My Portfolio
              </Navbar.Link>
              <Navbar.Link color="inherit" href="/mylimitorders">
                Limit Orders
              </Navbar.Link>
              <Navbar.Link color="inherit" href="/myhistory">
                Transactions
              </Navbar.Link>
              <Navbar.Link color="inherit" href="/account">
                My Account
              </Navbar.Link>
              <Navbar.Item>
                <Button auto bordered>
                  ${bal}
                </Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button auto flat as={Link} href="/#" onClick={handleLogout} color='error'>
                  Logout
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          </NavItem>
        )
      }
      {!login && (
        <NavItem>
          <Navbar.Content>
            <Navbar.Link color="inherit" href="/login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/register">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </NavItem>
      )}
    </Navbar>
  )
}
