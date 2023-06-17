// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { MessageForm } from './MessageForm';
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
      <h1>Delivery</h1>
      <button className="btn btn-primary" onClick={() => setLogs([])}>clear logs</button>
      {logs.map((log, index) => (
        <div key={index}>
          <p>{log.type}, {log.address}</p>
        </div>
      ))}
    </div>
  )
}

const Cook = () => {
  return (
    <div>
      <h1>Cook</h1>
    </div>
  )
}