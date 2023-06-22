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

  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const handleDelivered = async (order) => {
    try {
      await fetch(`http://localhost:5001/delivered/${order.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Delivered order ${order.id}`);
      // Update the UI to reflect the delivered status
      const updatedOrders = orders.map((o) => {
        if (o.id === order.id) {
          return { ...o, delivered: true };
        }
        return o;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error marking order as delivered:', error);
    }
  };

  return (
    <div className='w-100'>
      <h1>Delivery</h1>
      <div className="row h-100">
        <div className='col-6'>
          <h2>Ready for pick up</h2>
          {orders.map((order) => (
            <div key={order.id} className='d-flex justify-content-between pt-2'>
              <p>{order.orderItem}</p>
              {!order.delivered && (
                <button className="btn btn-primary" onClick={() => handleDelivered(order)}>delivered</button>
              )}
            </div>
          ))}
        </div>
        <div className='col-6'>
          <h2>Delivered:</h2>
          {deliveredOrders.map((order) => (
            <div key={order.id} className='d-flex justify-content-between pt-2'>
              <p>{order.orderItem}</p>
              <p>Delivered</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};