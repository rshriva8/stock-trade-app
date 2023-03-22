import axios from "axios";
import exp from "constants";
import React, { HtmlHTMLAttributes } from "react";
import { useEffect, useState, FC, InputHTMLAttributes } from "react"
import StockModel from "../../models/StockModels"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    volume: number;
}
type MarketDay = {
    id: number;
    openDaysOfWeek: number;
    openingTime: string;
    closingTime: string;
    open: boolean;
  };

  interface OrderFormProps {
    onSubmit: () => void;
  }


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
    const [volume, setVolume] = useState('');
    const[isHoliday,setIsHoliday]=useState(false);




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

            const current = new Date();
            const response2 = axios.get("http://localhost:8080/api/v1/check-holiday", {
                params:{
                    date: `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`
                },
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            })
            setIsHoliday((await response2).data);
            setIsLoading(false);

        };
        fetchStocks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
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
    
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesiredPrice(event.target.value);
        const n=parseInt(volume)
        const np=parseInt(event.target.value)
        if(!isNaN(n) && !isNaN(np)){
            setResult(n * np);
        }
    }
    const handleVolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(event.target.value);
        const n=parseInt(event.target.value)
        const np=parseInt(desiredPrice)
        if(!isNaN(n) && !isNaN(np)){
            setResult(n * np);
        }
    }
    const handleBuySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        

        event.preventDefault();
        if(isHoliday) alert("TODAY IS HOLIDAY!")
        else
        if (isOpen && balance && result <= balance && volume != '') {
            axios.get('http://localhost:8080/api/orders/limit-buy', {
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
        else if(isOpen)alert("Please Enter BUY VOLUME!!!")
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