import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditAccountProps {
    history: any;
    match: {
      params: {
        id: string;
      }
    }
  }
  

function EditAccount(props: EditAccountProps) {
  const [account, setAccount] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
      console.log('http://localhost:8080/api/v1/auth/userinfo');
    axios.get('http://localhost:8080/api/v1/auth/userinfo',{
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        },
    })
      .then(response => {
        setAccount(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put(`/api/accounts/${account.id}`, account)
      .then(response => {
        props.history.push(`/accounts/${account.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }
  

  return (
    <div>
      <h2>Edit Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={account.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={account.lastName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={account.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={account.password} onChange={handleChange} />
        </label>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default EditAccount;
