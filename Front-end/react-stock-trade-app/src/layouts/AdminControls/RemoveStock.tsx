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

export const RemoveStock = () => {

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



    const stockId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        
        setIsLoading(false);
    },[]);
      
    
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
    
    const handleRemoveSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        

        event.preventDefault();
            axios.get(`http://localhost:8080/api/v1/auth/delete/${stockId}`, {
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
            <form onSubmit={handleRemoveSubmit}>
            <div className="mt-4">
                <div className="ml-2">
                    <h2>{stock?.stockName}</h2>
                    <h5 className="text-primary">DO YOU WANT TO REMOVE THE STOCK?</h5>
                </div>
            <div><button className="btn btn-secondary">REMOVE STOCK</button></div>
            </div>
            </form>
            <hr />
        </div>
    );
};

export default RemoveStock;