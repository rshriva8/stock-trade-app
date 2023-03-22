import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Deposit() {
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/auth/userinfo', {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      },
    })
      .then(response => {
        console.log(response.data.lastName);
        setBalance(response.data.balance);
        setUser(response.data.username)
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  const handleDepositChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(event.target.value);
  }
  const handleDepositSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(depositAmount!=''){
    axios.get('http://localhost:8080/api/v1/auth/deposit', {
      params:{amount: depositAmount},
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }
    )

      .then(response => {
        setBalance(response.data.balance);
        setDepositAmount('');
        alert("DEPOSIT SUCCESS!!!")
      })
      .catch(error => {
        console.log(error);
      });
    }
    else{
      alert("Please enter deposit amount!!!")
    }
  }

  return (
    <div>
      <h2>My Balance</h2>
      {balance === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Your balance is: ${balance}</p>
          <form onSubmit={handleDepositSubmit}>
            <label>
              Deposit Amount:
              <input type="text" name="amount" value={depositAmount} onChange={handleDepositChange} />
            </label>
            <button type="submit">Deposit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Deposit;
