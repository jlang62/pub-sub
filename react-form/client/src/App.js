// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { MessageForm } from './MessageForm';
import { Nav } from './Nav';

import './App.css';


export default function App() {
  const [delivery, setDelivery] = useState(false);

  return (
    <div className="App">
      <Nav />
      <button className="btn btn-primary" onClick={() => setDelivery(!delivery)}>change view</button>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center">
          
            {delivery ? <MyComponent /> : <MessageForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

const MyComponent = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/logs');
        const logData = await response.json();
        setLogs(logData.logs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);


  return (
    <div>
      <h1>MyComponent</h1>
      <button className="btn btn-primary" onClick={() => setLogs([])}>clear logs</button>
      {logs.map((log, index) => (
        <div key={index}>
          <p>{log.type}</p>
          <p>{log.address}</p>
        </div>
      ))}
    </div>
  )
}