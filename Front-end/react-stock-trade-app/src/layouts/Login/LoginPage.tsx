import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { doLogin} from "../Auth";
import { Button, PressEvent } from "@nextui-org/react";
import './Login.css'


type LoginResponse = {
  token: string;
};

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history=useHistory()
  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  const handleLogin = async (e: PressEvent) => {
    try {
        
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data: LoginResponse = await response.json();
      // Save token to local storage or state
      doLogin(data.token,()=>{
        console.log("LOGIN SUCCESS!")
      });
      console.log(localStorage.getItem(""))
      history.push("/home")
      // Redirect to home page or update state to indicate successful login
    } catch (error) {
      setError("Invalid userName or password");
    }
  };

  return (
    
    <form className="login-form">
      <div>
        <label htmlFor="userName">userName</label>
        <input
          type="userName"
          id="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button onPress ={handleLogin} flat color="primary" auto>
          Primary
        </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
