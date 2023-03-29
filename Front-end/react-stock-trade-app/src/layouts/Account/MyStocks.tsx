import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwnershipModel from '../../models/OwnershipModel';

  var myval=0;

function MyStocks() {
  const [rows, setRows] = useState<OwnershipModel[]>([]);
  const[myBal, setMyBal] = useState(0);

 
  useEffect(() => {
    async function fetchRows() {
      const response = await fetch(`http://localhost:8080/api/v1/auth/myportfolio`, {
        headers: {
          "Authorization": `${localStorage.getItem('token')}`
        },
        mode: 'cors',
      });
      const data = await response.json();
      console.log(data)
      const loadedStocks: OwnershipModel[] = [];
      for (const key in data) {
          loadedStocks.push({
              user_stocks_id: data[key].user_stocks_id,
              userStocksVolume: data[key].userStocksVolume,
              user: data[key].user,
              stocks: data[key].stocks,
          });
          myval+=data[key].stocks?.stockValue*data[key].userStocksVolume;
          setRows(loadedStocks);
          setMyBal(data[key].user.balance);
    }
    
    

}
fetchRows();
  }, []);

  return (
    <div className='mt-5 container'>
        <div className='card'>
            <h5> Total Stocks Portfolio Value : {myval}</h5>
            <h5> Available Balance : {myBal}</h5>
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
                            <th scope='col'>Volume</th>
                            <th scope='col'>Total Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((rows) => (
                            <tr key={rows.user_stocks_id}>
                                <td>{rows.user_stocks_id}</td>
                                <td>{rows.stocks?.stockName}</td>
                                <td>{rows.stocks?.stockTicker}</td>
                                <td>{rows.stocks?.stockValue}</td>
                                <td>{rows.userStocksVolume}</td>
                                <td>{(rows.userStocksVolume) * (rows.stocks?.stockValue ? rows.stocks?.stockValue : 0)}</td>
                                <td><Link to={`/sell-stock/${rows.stocks?.id}`}><button className="btn btn-primary">Sell</button></Link></td>
                                <td><Link to={`/limitordersell/${rows.stocks?.id}`}><button className="btn btn-primary">Limit Order Sell</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
export default MyStocks;