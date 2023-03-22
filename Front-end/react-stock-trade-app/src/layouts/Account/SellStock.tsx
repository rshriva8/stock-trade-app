import axios from "axios";
import React, { HtmlHTMLAttributes } from "react";
import { useEffect, useState, FC, InputHTMLAttributes } from "react"
import StockModel from "../../models/StockModels"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import OwnershipModel from "../../models/OwnershipModel";

var myval=0;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    volume: number;
}
type MarketDay = {
    id: number;
    openDaysOfWeek: string;
    openingTime: string;
    closingTime: string;
    open: boolean;
  };

const Input: FC<InputProps> = ({ volume, ...rest }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor='volume'>{volume}</label>
            <input id="volume" {...rest}></input>
        </div>
    );
};
export default Input;

export const SellStock = () => {
    const [rows, setRows] = useState<OwnershipModel[]>([]);
    const [stock, setStock] = useState<StockModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [result, setResult] = useState<number>(0);
    const [sellVolume, setSellVolume] = useState('');
    const [balance, setBalance] = useState(null);
    const [volume, setVolume] = useState(null);
        const [isOpen, setIsOpen] = useState(false);
        const[isHoliday,setIsHoliday]=useState(false);

const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);



    const stockId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchRows = async () => {
            const baseUrl: string = `http://localhost:8080/api/v1/auth/myportfolio`;
            const response = await fetch(baseUrl, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            });
            console.log(response);

            const data = await response.json();
            console.log(data)
            const loadedStocks: OwnershipModel[] = [];
            for (const key in data) {
                loadedStocks.push({
                    user_stocks_id: data[key].user_stocks_id,
                    userStocksVolume: data[key].userStocksVolume,
                    user: data[key].user,
                    stocks: data[key].stocks
                });
                myval+=data[key].stocks?.stockValue*data[key].userStocksVolume;
                setRows(loadedStocks);
          }
      }
      fetchRows();
        }, []);
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
        function getStockVolume(stockId: string): number | undefined {
            const stock = rows.find(s => s.stocks?.id === parseInt(stockId));
            return stock ? stock.userStocksVolume : undefined;
        }
        function getStockValue(stockId: string): number | undefined {
            const stock = rows.find(s => s.stocks?.id === parseInt(stockId));
            return stock ? stock.stocks?.stockValue : undefined;
        }
        const vol=getStockVolume(stockId);
        const val=getStockValue(stockId);
    const handleSellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSellVolume(event.target.value);
        const n=parseInt(event.target.value)
        if(!isNaN(n)){
            setResult(val? val * n: 0);
        }
    }
    const handleSellSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isHoliday) alert("TODAY IS HOLIDAY!")
        else
        if (isOpen && sellVolume && parseInt(sellVolume) <= (vol ? vol : 0) && sellVolume != '') {
            axios.get('http://localhost:8080/api/v1/auth/sellstock', {
                params: { volume: parseInt(sellVolume),
                stockId: parseInt(stockId),
                value: val },
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            }
            )
                .then(response => {
                    setBalance(response.data.balance);
                    setSellVolume('');
                    alert("TRANSACTION SUCCESS!!")
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if (isOpen && parseInt(sellVolume) > (vol ? vol : 0) && sellVolume != '') {
            alert("NOT ENOUGH STOCKS!!!")
        }
        else if(isOpen) alert("Please Enter Sell Volume!!!")
        else {
            alert("MARKET IS CLOSED RIGHT NOW!!!")
        }
    }


    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className='row mt-5'>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{stock?.stockName}</h2>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <form onSubmit={handleSellSubmit}>
            <div className="mt-4">
                <div className="ml-2">
                    <h2>{stock?.stockName}</h2>
                    <h5 className="text-primary">Current Value of Stock is {val}</h5>
                    <h5 className="text-primary">Current Volume you have available is {vol}</h5>
                </div>
                <div>
                        <input
                            type="number"
                            value={sellVolume} onChange={handleSellChange}
                        />
                        Gross Total: {result}
                </div>
            <div><button className="btn btn-secondary">Sell Now</button></div>
            </div>
            </form>
            <hr />
        </div>
    );
}