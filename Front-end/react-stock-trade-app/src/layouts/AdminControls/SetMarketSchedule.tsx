import axios from 'axios';
import React, { useState } from 'react';

function SetMarketSchedule() {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const marketHours = {
      dayOfWeek,
      openTime,
      closeTime,
      isOpen
    };
    axios.get('http://localhost:8080/market-hours/set', {
      params:{
        dayOfWeek: dayOfWeek,
        openingTime: openTime+":00",
        closingTime: closeTime+":00",
        isOpen: isOpen,
      },
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        // Reset the form after successful submission
        setDayOfWeek('');
        setOpenTime('');
        setCloseTime('');
        setIsOpen(false);
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
        Day of Week:
        <select value={dayOfWeek} onChange={(event) => setDayOfWeek(event.target.value)}>
          <option value="">Select Day</option>
          <option value="7">Sunday</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
      </label>
      <label>
        Open Time:
        <input type="time" value={openTime} onChange={(event) => setOpenTime(event.target.value)} />
      </label>
      <label>
        Close Time:
        <input type="time" value={closeTime} onChange={(event) => setCloseTime(event.target.value)} />
      </label>
      <label>
        Is Open:
        <input type="checkbox" checked={isOpen} onChange={(event) => setIsOpen(event.target.checked)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SetMarketSchedule;
