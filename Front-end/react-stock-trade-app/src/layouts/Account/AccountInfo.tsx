import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
function AccountInfo() {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<Acc | null>(null);
    const [error, setError] = useState<ErrorResponse | null>(null);


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/auth/userinfo', {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`
                    },
                });
                setAccount(response.data)
                console.log(account? account.firstName: null)
            } catch (error) {
                setError(error as ErrorResponse);
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    },[]);
        if (loading) {
            return <div>Loading user info...</div>;
        }

        if (error) {
            return <div>{error ? null : error}</div>;
        }
        return (
            <div>
            <div>
                <h2>Account Details</h2>
                <p>Name: {account? account.firstName : null}</p>
                <p>Email: {account? account.email: null}</p>
                <p>Phone Number: {account? account.phoneNumber: null}</p>
                <p>Available Balance: {account? account.balance: null}</p>
            </div>
            <div>
            <Link to="/editAccount">
            <button>Update Info</button>
            </Link>
            </div>
            <div>
            <Link to="/deposit">
            <button>Deposit Money</button>
            </Link>
            </div>
            <div>
            <Link to="/withdraw">
            <button>Withdraw Money</button>
            </Link>
            </div>
            <div>
            <Link to="/myportfolio">
            <button>My Portfolio</button>
            </Link>
            </div>
            <div>
            <Link to="/myhistory">
            <button>My Transactions</button>
            </Link>
            </div>
            </div>
        );

  }

  export default AccountInfo;