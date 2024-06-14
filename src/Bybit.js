import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bybit = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trade-history');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTradeHistory();
  }, []);

  return (
    <div>
      <h1>Bybit API Data</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Trade ID</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trade) => (
            <tr key={trade.exec_id}>
              <td>{trade.exec_id}</td>
              <td>{trade.symbol}</td>
              <td>{trade.price}</td>
              <td>{trade.order_qty}</td>
              <td>{trade.side}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bybit;
