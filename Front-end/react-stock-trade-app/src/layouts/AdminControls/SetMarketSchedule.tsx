import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MarketScheduleModel from '../../models/MarketScheduleModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

function SetMarketSchedule() {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCallTime, setLastCallTime] = useState(0);
  const [httpError, setHttpError] = useState(null);

  const [scheduleInfo, setScheduleInfo] = useState<MarketScheduleModel[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime < 2000 && lastCallTime!=0) {
            return;
        }

        setLastCallTime(currentTime);
    axios.get("http://localhost:8080/market-hours/marketSchedule", {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        },
    })
      .then(response => {
        setScheduleInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
            setIsLoading(false);
        };
        setTimeout(() => fetchSchedules().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        }));
  }, [lastCallTime]);

  if (isLoading) {
    return (
        <SpinnerLoading />
    )
}
if (httpError) {
    return (
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    )
}
  
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
        setScheduleInfo(response.data);
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

  const handleDeleteSubmit = async (id: number) => {
    axios.get('http://localhost:8080/market-hours/delete', {
      params:{
        id: id
      },
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        setScheduleInfo(response.data);
        // Reset the form after successful submission
        setDayOfWeek('');
        setOpenTime('');
        setCloseTime('');
        alert('Market schedule updated successfully!');
        
      })
      .catch(error => {
        console.log(error);
        alert('Failed to update market schedule.');
      });
  };

  return (
    <>
    
    <div className='mt-5 container'>
        <div className='card'>
          <div className='card-header'>
            Set New Schedule
          </div>
          <div className='card-body'>
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
    </div>
    </div>
    </div>
    
    <div className='mt-5 container'>
        <div className='card'>
          <div className='card-header'>
            Active Days of the Week
          </div>
          <div className='card-body'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Day of week</th>
                  <th scope='col'>Opening Time</th>
                  <th scope='col'>Closing Time</th>
                </tr>
              </thead>
              <tbody>
                {scheduleInfo.map(schedule => (
                  <tr key={schedule.id}>
                    <td>{schedule.id}</td>
                    <td>{schedule.openDaysOfWeek}</td>
                    <td>{schedule.openingTime.toString()}</td>
                    <td>{schedule.closingTime.toString()}</td>
                    <td><button onClick={()=>handleDeleteSubmit(schedule.id)} className="btn btn-primary">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div></>
  );
}

export default SetMarketSchedule;
