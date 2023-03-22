import axios from 'axios';
import React, { useState } from 'react';

function SetHoliday() {
  const [date, setDate] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    axios.get('http://localhost:8080/api/v1/declare-holiday', {
      params:{
        date: date
      },
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        // Reset the form after successful submission
        alert('Market schedule updated successfully!');
      })
      .catch(error => {
        console.log(error);
        alert('Failed to update market schedule.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date: 
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SetHoliday;
