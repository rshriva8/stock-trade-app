import axios from 'axios';
import { functionsIn } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LimitOrderModel from '../../models/LimitOrderModel';

function MyLimitOrders (){
  const [rows, setRows] = useState<LimitOrderModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [marketSchedule, setMarketSchedule] = useState<MarketDay[]>([]);
  type MarketDay = {
    id: number;
    openDaysOfWeek: number;
    openingTime: string;
    closingTime: string;
    open: boolean;
  };

 
  useEffect(() => {
    async function fetchRows() {
      const response = await fetch('http://localhost:8080/api/orders/auth/mylimitorders', {
        headers: {
          "Authorization": `${localStorage.getItem('token')}`
        },
        mode: 'cors',
      });
      const data = await response.json();
      console.log(data)
      const loadedOrders: LimitOrderModel[] = [];
      for (const key in data) {
        loadedOrders.push({
            id: data[key].id,
            stock: data[key].stock,
            orderVolume: data[key].orderVolume,
            desiredPrice: data[key].desiredPrice,
            moneyHeld: data[key].moneyHeld,
            expiryDate: data[key].expiryDate,
            status: data[key].status,
            dateCreated: data[key].dateCreated,
            lastUpdated: data[key].lastUpdated,
            user: data[key].user,
            orderType: data[key].orderType
        });
          setRows(loadedOrders);
    }
}
fetchRows();
  }, []);
  return (
    <div className='mt-5 container'>
        <div className='card'>
            <div className='card-header'>
                My PortFolio
            </div>
            <div className='card-body'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Stock</th>
                            <th scope='col'>Stock Ticker</th>
                            <th scope='col'>Stock Value</th>
                            <th scope='col'>OrderType</th>
                            <th scope='col'>Volume</th>
                            <th scope='col'>DesiredPrice</th>
                            <th scope='col'>MoneyHeld</th>
                            <th scope='col'>Expiry Date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Date created</th>
                            <th scope='col'>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((rows) => (
                            <tr key={rows.id}>
                                <td>{rows.id}</td>
                                <td>{rows.stock?.stockName}</td>
                                <td>{rows.stock?.stockTicker}</td>
                                <td>{rows.stock?.stockValue}</td>
                                <td>{rows.orderType}</td>
                                <td>{rows.orderVolume}</td>
                                <td>{rows.desiredPrice}</td>
                                <td>{rows.moneyHeld}</td>
                                <td>{rows.expiryDate.toString()}</td>
                                <td>{rows.status}</td>
                                <td>{rows.dateCreated.toString()}</td>
                                <td>{rows.lastUpdated.toString()}</td>
                                <td><Link to={`/cancel-order/${rows.id}`}><button className="btn btn-primary">Cancel Order</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
export default MyLimitOrders;