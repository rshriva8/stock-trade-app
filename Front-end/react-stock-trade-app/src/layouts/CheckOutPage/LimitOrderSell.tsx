import axios from "axios";
import exp from "constants";
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


export const LimitOrderBuy = () => {

    const [stock, setStock] = useState<StockModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [result, setResult] = useState<number>(0);
    const [balance, setBalance] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);
    const [desiredPrice, setDesiredPrice] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [holidays, setHolidays] = useState<any[]>([])
    const [volume, setVolume] = useState('');
    const [isHoliday, setIsHoliday] = useState(false);


    const stockId = (window.location.pathname).split('/')[2];
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


            const baseUrl: string = `http://localhost:8080/stock-trade-app/stocks/${stockId}`;

            const response = await fetch(baseUrl, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            });
            console.log(response);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
            const loadedStocks: StockModel = {
                stockId: responseData.stockId,
                stockName: responseData.stockName,
                stockValue: responseData.stockValue,
                stockTicker: responseData.stockTicker,
                stockVolume: responseData.stockVolume
            };
            setStock(loadedStocks);
            setIsLoading(false);
            fetchMarketSchedule();

        };
        fetchStocks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[]);

    useEffect(() => {
        async function fetchHolidays() {
          const result = await axios.get('http://localhost:8080/api/holiday/get-holidays', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }});
          setHolidays(result.data);
        }
    
        fetchHolidays();
      }, []);

      useEffect(() => {
        const today = new Date();
        const todaysdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        holidays.forEach(holiday => {
            const idate=holiday.date
            const formatDate = (idate: Date) => {
                const date = new Date(idate);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}-${month}-${day}`;
              }
          if (formatDate(idate) == todaysdate) {
            setIsHoliday(true);
            console.log("true hai")
          }
        });
      }, [holidays]);
    
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
      };

      useEffect(() => {
        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();
    
        // Check if the market is open
        console.log(marketSchedule)
        const marketDay = marketSchedule.find(day => day.openDaysOfWeek.toString() === currentDay.toString());
        console.log(currentDay)
        if (marketDay) {
            const openTime = marketDay.openingTime.split(":").map(Number);
          const closeTime = marketDay.closingTime.split(":").map(Number);
          const openMinutes = openTime[0] * 60 + openTime[1];
          const closeMinutes = closeTime[0] * 60 + closeTime[1];
          console.log(currentTime, currentDay, openMinutes, closeMinutes)
          if (currentTime >= openMinutes && currentTime < closeMinutes) {
            setIsOpen(true);
          }
        }
      }, [marketSchedule])

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
    
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const n=parseInt(volume)
        const np=parseInt(event.target.value)
        if(!isNaN(n) && !isNaN(np)){
            setResult(n * np);
        }
        const price=event.target.value;
      const regex = /^\d*\.?\d*$/;
      if(regex.test(price)){
        setDesiredPrice(event.target.value);
        setResult(n * np)
      }
      else{
        setDesiredPrice('0');
        setResult(0)
      }
    }
    const handleVolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const n=parseInt(event.target.value)
        const np=parseInt(desiredPrice)
        if(!isNaN(n) && !isNaN(np)){
            setResult(n * np);
        }
        const vol=event.target.value;
        const regex = /^\d*\.?\d*$/;
        if(regex.test(vol)){
          setVolume(event.target.value);
          setResult(n * np)
        }
        else{
          setVolume('0');
          setResult(0)
        }
    }
    const handleBuySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        

        event.preventDefault();
        if(expiryDate=='') alert("Please Select an EXPIRY DATE");
        else if(isHoliday) alert("TODAY IS HOLIDAY!")
        else if(isOpen && balance && result <= balance && volume != '') {
            axios.get('http://localhost:8080/api/orders/limit-sell', {
                params: { volume: volume,
                stockId: parseInt(stockId),
                desiredValue: parseInt(desiredPrice),
                expiryDate: expiryDate },
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            }
            )
                .then(response => {
                    setBalance(response.data.balance);
                    setVolume('');
                    alert("TRANSACTION SUCCESS!!")
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if (isOpen && balance && result > balance && volume != '') {
            alert("NOT ENOUGH FUNDS!!!")
        }
        else if(isOpen)alert("Please Enter SELL VOLUME!!!")
        else {
            alert("MARKET CLOSED!!!")
        }
    }


    return (
        <form onSubmit={handleBuySubmit}>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={desiredPrice}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="volume">Volume:</label>
          <input
            id="volume"
            type="number"
            value={volume}
            onChange={handleVolChange}
          />
          Gross Total: {result}
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setExpiryDate(event.target.value)
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
};

export default LimitOrderBuy;