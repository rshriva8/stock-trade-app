import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoryModel from '../../models/HistoryModel';
  var myval=0;

function AccountHistory() {
  const [rows, setRows] = useState<HistoryModel[]>([]);

 
  useEffect(() => {
    async function fetchRows() {
      const response = await fetch(`http://localhost:8080/api/v1/auth/myhistory`, {
        headers: {
          "Authorization": `${localStorage.getItem('token')}`
        },
        mode: 'cors',
      });
      const data = await response.json();
      console.log(data)
      const loadedStocks: HistoryModel[] = [];
      for (const key in data) {
          loadedStocks.push({
            orderId: data[key].orderId,
            orderType: data[key].orderType,
            orderVolume: data[key].orderVolume,
            orderTimestamp: data[key].orderTimestamp,
            user: data[key].user,
            stock: data[key].stock,
            totalPrice: data[key].totalPrice,
            openPrice: data[key].openPrice
          });
          myval+=data[key].stocks?.stockValue*data[key].userStocksVolume;
          setRows(loadedStocks);
    }
    

}
fetchRows();
  }, []);

  return (
    <div className='mt-5 container'>
        <div className='card'>
            <div className='card-header'>
                <h4>My History</h4>
            </div>
            <div className='card-body'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>TXN ID</th>
                            <th scope='col'>Order Type</th>
                            <th scope='col'>Stock Name</th>
                            <th scope='col'>Stock Ticker</th>
                            <th scope='col'>Volume</th>
                            <th scope='col'>Stock Open Price</th>
                            <th scope='col'>Total Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((rows) => (
                            <tr key={rows.orderId}>
                                <td>{rows.orderId}</td>
                                <td>{rows.orderType}</td>
                                <td>{rows.stock?.stockName}</td>
                                <td>{rows.stock?.stockTicker}</td>
                                <td>{rows.orderVolume}</td>
                                <td>{rows.openPrice}</td>
                                <td>{rows.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
export default AccountHistory;