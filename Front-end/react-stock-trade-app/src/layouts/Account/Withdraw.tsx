import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Withdraw() {
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');

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

  const handleWithdrawChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(event.target.value);
  }
  const handleWithdrawSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(balance && withdrawAmount<=balance && withdrawAmount!=''){
    axios.get('http://localhost:8080/api/v1/auth/withdraw', {
      params:{amount: withdrawAmount},
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }
    )

      .then(response => {
        setBalance(response.data.balance);
        setWithdrawAmount('');
        alert("WITHDRAW SUCCESS!!")
      })
      .catch(error => {
        console.log(error);
      });
    }
    else if(balance && withdrawAmount>balance  && withdrawAmount!=''){
        alert("Balance amount is less than withdraw amount!!!")
    }
    else{
        alert("Please Enter Withdraw Amount!!!")
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
          <form onSubmit={handleWithdrawSubmit}>
            <label>
              Withdraw Amount:
              <input type="text" name="amount" value={withdrawAmount} onChange={handleWithdrawChange} />
            </label>
            <button type="submit">Withdraw</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Withdraw;
