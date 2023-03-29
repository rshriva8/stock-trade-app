import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockDataModel from '../../models/StockDataModel';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../Utils/SpinnerLoading';


function StockData() {
  const [stockInfoList, setStockInfoList] = useState<StockDataModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [lastCallTime, setLastCallTime] = useState(0);

  useEffect(() => {
    const fetchStocks = async () => {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime < 2000) {
            return;
        }

        setLastCallTime(currentTime);
    axios.get('http://localhost:8080/api/v1/auth/stockdata', {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        },
    })
      .then(response => {
        setStockInfoList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
            setIsLoading(false);
        };
        setTimeout(() => fetchStocks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        }), 2000);
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
  return (
    <div className='mt-5 container'>
            <div className='card'>
                <div className='card-header'>
                    Stocks
                </div>
                <div className='card-body'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Ticker</th>
                                <th scope='col'>Current Value</th>
                                <th scope='col'>Daily Low</th>
                                <th scope='col'>Daily High</th>
                                <th scope='col'>Volume</th>
                                <th scope='col'>Market Capitalization</th>
                            </tr>
                        </thead>
                        <tbody>
                        {stockInfoList.map(stockInfo => (
                                <tr key={stockInfo.id}>
                                    <td>{stockInfo.id}</td>
                                    <td>{stockInfo.name}</td>
                                    <td>{stockInfo.ticker}</td>
                                    <td>${stockInfo.price}</td>
                                    <td>${stockInfo.dailyLow}</td>
                                    <td>${stockInfo.dailyHigh}</td>
                                    <td>{stockInfo.volume}</td>
                                    <td>${stockInfo.volume * stockInfo.price}</td>
                                    <td><Link to={`/checkout/${stockInfo.id}`}><button className="btn btn-primary">Buy Now</button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
}

export default StockData;