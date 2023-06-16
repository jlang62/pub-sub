// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

import React from 'react';
import { MessageForm } from './MessageForm';
import { Delivery } from './Delivery';
import { Nav } from './Nav';

import './App.css';


function App() {
  const url =  window.location.pathname.substr(1);
  return (
    <div className="App">
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center">
          {url === "delivery" ? <Delivery /> : <MessageForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
