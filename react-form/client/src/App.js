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
        const response = await fetch('http://localhost:5009/pickup');
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelivered = async (orderId) => {
    try {
      await fetch(`http://localhost:5009/pickup/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='w-100'>
      <h1>Delivery</h1>
      <div className="row h-100">
        <div className='col-6'>
          <h2>Incoming orders:</h2>
          <p>Test</p>
        </div>
        <div className='col-6'>
          <h2>Ready for pick up</h2>
          {orders.map((order, index) => (
            <div key={index} className='d-flex justify-content-between pt-2'>
              <p>{order.orderItem}</p>
              <button className="btn btn-primary" onClick={() => handleDelivered(order.id)}>delivered</button>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className='col-12'>
          <h2>Delivered:</h2>
        </div>
      </div>
    </div>
  )
}