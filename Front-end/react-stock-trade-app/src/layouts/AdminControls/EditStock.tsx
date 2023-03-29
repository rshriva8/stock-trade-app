import axios from "axios";
import React, { HtmlHTMLAttributes } from "react";
import { useEffect, useState, FC, InputHTMLAttributes } from "react"
import StockModel from "../../models/StockModels"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    new_value: number;
    new_name: string;
    new_ticker: string;
}

interface StockUpdation {
    stockName: string;
    stockValue: number;
    stockTicker: string;
    stockVolume: number;
}



const Input: FC<InputProps> = ({ new_name, new_value, new_ticker, ...rest }) => {
    return (
        <div>
            <div className="input-wrapper">
                <label htmlFor='Stock Name'>{new_name}</label>
                <input id="new_name" {...rest}></input>
            </div>
            <div className="input-wrapper">
                <label htmlFor='new_value'>{new_value}</label>
                <input id="new_value" {...rest}></input>
            </div>
            <div className="input-wrapper">
                <label htmlFor='new_ticker'>{new_ticker}</label>
                <input id="new_ticker" {...rest}></input>
            </div>
        </div>
    );
};
export default Input;

export const EditStock = () => {

    const [stock, setStock] = useState<StockModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);



    const stockId = (window.location.pathname).split('/')[3];

    const [formData, setFormData] = useState<StockUpdation>({
        stockName: '',
        stockValue: 0,
        stockTicker: '',
        stockVolume: 0
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        //   const response = await axios.put('http://localhost:8080/stock-trade-app/stocks/', formData);
        //   console.log(response.data);
    }

    useEffect(() => {
        const fetchStocks = async () => {
            const baseUrl: string = `http://localhost:8080/stock-trade-app/stocks/${stockId}`;

            const response = await fetch(baseUrl);
            console.log(response);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const loadedStocks: StockModel={
                stockId: responseJson.stockId,
                stockName: responseJson.stockName,
                stockValue: responseJson.stockValue,
                stockTicker: responseJson.stockTicker,
                stockVolume: responseJson.stockVolume
            };

            setStock(loadedStocks);
            setIsLoading(false);
        };
        fetchStocks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

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


    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className='row mt-5'>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{stock?.stockName}</h2>
                        </div>
                    </div>
                    <h2>{stock?.stockValue}</h2>
                </div>
                <hr />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="stockName">Stock Name:</label>
                    <input
                        type="text"
                        id="stockName"
                        name="stockName"
                        value={formData.stockName=='' ? stock?.stockName:formData.stockName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="stockValue">Stock Value:</label>
                    <input
                        type="number"
                        id="stockValue"
                        name="stockValue"
                        value={(formData.stockValue)==0 ? stock?.stockValue:formData.stockValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="stockTicker">Stock Tick Size:</label>
                    <input
                        type="text"
                        id="stockTicker"
                        name="stockTicker"
                        value={(formData.stockTicker)=='' ? stock?.stockTicker:formData.stockTicker}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="stockVolume">Stock Volume:</label>
                    <input
                        type="number"
                        id="stockVolume"
                        name="stockVolume"
                        value={(formData.stockVolume)==0 ? stock?.stockVolume:formData.stockVolume}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update Stock</button>
            </form>
        </div>

    );
}