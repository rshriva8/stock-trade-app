import axios from "axios";
import React, { HtmlHTMLAttributes } from "react";
import { useEffect, useState, FC, InputHTMLAttributes } from "react"
import { Link } from "react-router-dom";
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


const Input: FC<InputProps> = ({ volume, ...rest }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor='volume'>{volume}</label>
            <input id="volume" {...rest}></input>
        </div>
    );
};
export default Input;

export const CheckoutPage = () => {

    const [stock, setStock] = useState<StockModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [result, setResult] = useState<number>(0);
    const [buyVolume, setBuyVolume] = useState('');
    const [balance, setBalance] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [holidays, setHolidays] = useState<any[]>([])
    const [isHoliday, setIsHoliday] = useState(false);
    const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);
    // const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);


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
        const data = response.json().then((data) => {
            setMarketSchedule(data);
        })
      };

      
      useEffect(() => {
        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();
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
    
    const handleBuyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const n=parseInt(event.target.value)
        if(!isNaN(n)){
            setResult(stock?.stockValue?stock?.stockValue * n: 0);
        }
        const buyVol=event.target.value;
        const regex = /^\d*\.?\d*$/;
        if(regex.test(buyVol)){
            setBuyVolume(event.target.value);
        }
        else{
            setBuyVolume('0');
        }
    }
    const handleBuySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        fetchMarketSchedule();
        event.preventDefault();
        if(isHoliday) alert("TODAY IS HOLIDAY!")
        else if (isOpen && balance && result <= balance && buyVolume != '') {
            axios.get('http://localhost:8080/api/v1/auth/buystock', {
                params: { volume: buyVolume,
                stockId: parseInt(stockId),
                value: stock?.stockValue },
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            }
            )
                .then(response => {
                    setBalance(response.data.balance);
                    setBuyVolume('');
                    alert("TRANSACTION SUCCESS!!")
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if (isOpen && balance && result > balance && buyVolume != '') {
            alert("NOT ENOUGH FUNDS!!!")
        }
        else if(isOpen)alert("Please Enter BUY VOLUME!!!")
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
                            <h2>{stock?.stockName}</h2>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <form onSubmit={handleBuySubmit}>
            <div className="mt-4">
                <div className="ml-2">
                    <h2>{stock?.stockName}</h2>
                    <h5 className="text-primary">Current Value of Stock is {stock?.stockValue}</h5>
                    <h5 className="text-primary">Current Balance is {balance}</h5>
                </div>
                <div>
                    
                        <input
                            type="number"
                            value={buyVolume} onChange={handleBuyChange}
                        />
                        Gross Total: {result}
                </div>
            <div><button className="btn btn-secondary">Buy Now</button></div>
            </div>
            </form>
            <td><Link to={`/limitorderbuy/${stockId}`}><button className="btn btn-primary">Limit Order</button></Link></td>
            <hr />
        </div>
    );
};