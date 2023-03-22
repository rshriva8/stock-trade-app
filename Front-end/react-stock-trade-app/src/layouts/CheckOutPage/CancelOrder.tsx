import axios from "axios";
import React, { HtmlHTMLAttributes } from "react";
import { useEffect, useState, FC, InputHTMLAttributes } from "react"
import StockModel from "../../models/StockModels"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

type MarketDay = {
    id: number;
    openDaysOfWeek: number;
    openingTime: string;
    closingTime: string;
    open: boolean;
  };

export const CancelOrder = () => {

    const [stock, setStock] = useState<StockModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [result, setResult] = useState<number>(0);
    const [buyVolume, setBuyVolume] = useState('');
    const [balance, setBalance] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);
    const[loaded,setLoaded]=useState(false);



    const orderId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        const fetchStocks = async () => {
          axios.get('http://localhost:8080/api/v1/auth/userinfo', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    setBalance(response.data.balance)
                })
                .catch(error => {
                    console.log(error);
                });

        };
        setIsLoading(false);
    },[]);
    const fetchMarketSchedule = async () => {
        const response = await fetch("http://localhost:8080/market-hours/marketSchedule", {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch market schedule");
        }
        const data = await response.json();
        setMarketSchedule(data);
        checkMarketStatus();
      };
      const checkMarketStatus = () => {
        // Get the current time and day of the week
        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();
    
        // Check if the market is open
        const marketDay = marketSchedule.find(day => day.openDaysOfWeek.toString() === currentDay.toString());
        console.log(currentDay)
        if (marketDay && marketDay.open) {
            const openTime = marketDay.openingTime.split(":").map(Number);
          const closeTime = marketDay.closingTime.split(":").map(Number);
          const openMinutes = openTime[0] * 60 + openTime[1];
          const closeMinutes = closeTime[0] * 60 + closeTime[1];
          console.log(currentTime, currentDay, openMinutes, closeMinutes)
          if (currentTime >= openMinutes && currentTime < closeMinutes) {
            setIsOpen(true);
          }
        }
      };
      fetchMarketSchedule();
      
    
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
    
    const handleCancelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        

        event.preventDefault();
        if (isOpen) {
            axios.get(`http://localhost:8080/api/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            }
            )
                .then(response => {
                    alert("TRANSACTION SUCCESS!!")
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            alert("MARKET CLOSED!!!")
        }
    }


    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className='row mt-5'>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <form onSubmit={handleCancelSubmit}>
            <div className="mt-4">
                <div className="ml-2">
                    <h2>{stock?.stockName}</h2>
                    <h5 className="text-primary">DO YOU WANT TO CANCEL THE ORDER?</h5>
                </div>
            <div><button className="btn btn-secondary">CANCEL ORDER</button></div>
            </div>
            </form>
            <hr />
        </div>
    );
};

export default CancelOrder;