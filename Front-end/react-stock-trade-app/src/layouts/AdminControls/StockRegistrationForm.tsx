import React, { useState } from 'react';
import axios from 'axios';

interface StockRegistration {
  stockName: string;
  stockValue: number;
  stockTicker: number;
  stockVolume: number;
}

export const StockRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<StockRegistration>({
    stockName: "",
    stockValue: 0,
    stockTicker: 0,
    stockVolume: 0,
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
      const token = localStorage.getItem('token');
      console.log(token);
      const url='http://localhost:8080/stock-trade-app/stocks/';
      const config = {
        headers: { Authorization: `${token}` },
        mode: 'cors',
      };
      const response = axios.post(url, formData, config);
      }
    }
  const validateFormData = (data: StockRegistration): string[] => {
    const errors: string[] = [];

    if (!data.stockName) {
      errors.push('Stock name is required');
    }

    if (!data.stockValue) {
      errors.push('Stock value is required');
    } else if (isNaN(Number(data.stockValue))) {
      errors.push('Stock value must be a number');
    }

    if (!data.stockTicker) {
      errors.push('Stock tick size is required');
    } else if (isNaN(Number(data.stockTicker))) {
      errors.push('Stock tick size must be a number');
    }

    if (!data.stockVolume) {
      errors.push('Stock volume is required');
    } else if (isNaN(Number(data.stockVolume))) {
      errors.push('Stock volume must be a number');
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="stockName">Stock Name:</label>
        <input
          type="text"
          id="stockName"
          name="stockName"
          value={formData.stockName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="stockValue">Stock Value:</label>
        <input
          type="number"
          id="stockValue"
          name="stockValue"
          value={formData.stockValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="stockTicker">Stock Tick Size:</label>
        <input
          type="number"
          id="stockTicker"
          name="stockTicker"
          value={formData.stockTicker}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="stockVolume">Stock Volume:</label>
        <input
          type="number"
          id="stockVolume"
          name="stockVolume"
          value={formData.stockVolume}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Register Stock</button>
      {errorMessages.length > 0 && (
        <ul>
          {errorMessages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default StockRegistrationForm;