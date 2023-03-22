import React, { useState } from 'react';
import axios from 'axios';

interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  availableBalance: number;
}

export const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserRegistration>({
    "firstName": "",
    "lastName": "",
    "email": "",
    "userName": "",
    "password": "",
    "confirmPassword": "",
    "availableBalance": 0
  });

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      try{
      const response = await axios.post('http://localhost:8080/api/v1/auth/signup', formData);
      console.log(response.data);
      alert("Sign Up SUCCESS! Now You may log in")
      }
      catch(e){
        alert(e);
      }
    }
  };

  const validateFormData = (data: UserRegistration): string[] => {
    const errors: string[] = [];

    if (!data.firstName) {
      errors.push('First name is required');
    }

    if (!data.lastName) {
      errors.push('Last name is required');
    }

    if (!data.email) {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Invalid email address');
    }

    if (!data.password) {
      errors.push('Password is required');
    } else if (data.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (data.password !== data.confirmPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="username"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Register</button>
      {errorMessages.length > 0 && (
        <ul>
          {errorMessages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
export default UserRegistrationForm;