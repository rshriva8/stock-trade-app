import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HolidayModel from '../../models/HolidayModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

function SetHoliday() {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastCallTime, setLastCallTime] = useState(0);
  const [httpError, setHttpError] = useState(null);
  const [holidays, SetHolidays] =  useState<HolidayModel[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime < 2000 && lastCallTime!=0) {
            return;
        }

        setLastCallTime(currentTime);
    axios.get("http://localhost:8080/api/holiday/get-holidays", {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        },
    })
      .then(response => {
        SetHolidays(response.data);
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
    axios.get('http://localhost:8080/api/holiday/declare-holiday', {
      params:{
        date: date
      },
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        SetHolidays(response.data);
        // Reset the form after successful submission
        alert('Market schedule updated successfully!');
      })
      .catch(error => {
        console.log(error);
        alert('Failed to update market schedule.');
      });
  };

  const handleDeleteSubmit = async (id: number) => {
    axios.get('http://localhost:8080/api/holiday/delete', {
      params:{
        id: id
      },
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        SetHolidays(response.data);
        // Reset the form after successful submission
        alert('Holidays updated successfully!');
        
      })
      .catch(error => {
        console.log(error);
        alert('Failed to update Holidays.');
      });
  };


  return (
      <><div className='mt-5 container'>
      <div className='card'>
        <div className='card-header'>
          Declare New Holiday
        </div>
        <div className='card-body'></div>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div><div className='mt-5 container'>
        <div className='card'>
          <div className='card-header'>
            Declared Upcoming Holidays
          </div>
          <div className='card-body'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Date of Holiday</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map(holiday => (
                  <tr key={holiday.holidayId}>
                    <td>{holiday.holidayId}</td>
                    <td>{holiday.date.toString()}</td>
                    <td><button onClick={() => handleDeleteSubmit(holiday.holidayId)} className="btn btn-primary">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div></>
  );
}

export default SetHoliday;
