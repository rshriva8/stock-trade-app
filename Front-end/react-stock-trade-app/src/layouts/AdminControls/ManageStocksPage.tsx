import React from "react";
import { useState, useEffect } from "react"
import StockModel from "../../models/StockModels"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import NewStockForm from "../ConfigStocks/NewStockForm";
import { Link } from "react-router-dom";
import axios from "axios";
import StockDataModel from "../../models/StockDataModel";
export const ManageStocksPage=()=>{

    const[stocks,setStocks] = useState<StockDataModel[]>([]);
    const[isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [lastCallTime, setLastCallTime] = useState(0);

    
    useEffect(()=> {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime < 2000) {
            return;
        }
        const fetchStocks=async()=>{
            axios.get('http://localhost:8080/api/v1/auth/stockdata', {
        headers: {
            Authorization: `${localStorage.getItem('token')}`
        },
    })
      .then(response => {
        setStocks(response.data);
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

    if(isLoading){
        return (
            <SpinnerLoading/>
        )
    }
    if(httpError){
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
            {stocks.map((stocks) => (
              <tr key={stocks.id}>
                                    <td>{stocks.id}</td>
                                    <td>{stocks.name}</td>
                                    <td>{stocks.ticker}</td>
                                    <td>{stocks.price}</td>
                                    <td>{stocks.dailyLow}</td>
                                    <td>{stocks.dailyHigh}</td>
                                    <td>{stocks.volume}</td>
                                    <td>{stocks.volume * stocks.price}</td>
                <td><Link to={`/admin/edit-stock/${stocks.id}`}><button className="btn btn-primary">Edit</button></Link></td>
                <td><Link to={`/remove/${stocks.id}`}><button className="btn btn-primary">Remove</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
      );
}