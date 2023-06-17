// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { MessageForm } from './MessageForm';
import { Cook } from './Cook';
import { Nav } from './Nav';

import './App.css';




export default function App() {
  const [screen, setScreen] = useState(0);

  function changeView() {
    const newScreen = (screen + 1) % 3;
    setScreen(newScreen);
  }
  

  return (
    <div className="App">
      <Nav />
      <button className="btn btn-primary" onClick={() => changeView()}>change view</button>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center">
            {
              screen === 0 ? <MessageForm /> : screen === 1 ? <Delivery /> : <Cook />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const Delivery = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders');
        const orderData = await response.json();
        setOrders(orderData.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div>
      <h1>Delivery</h1>
      <button className="btn btn-primary" onClick={() => setOrders([])}>clear logs</button>
      {orders.map((order, index) => (
        <div key={index}>
          <p>{order.type}, {order.address}</p>
        </div>
      ))}
    </div>
  )
}