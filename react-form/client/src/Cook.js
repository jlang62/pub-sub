//
// Copyright 2021 The Dapr Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React, { useEffect, useState }  from 'react';

export class Cook extends React.Component {
    constructor(props) {
      super(props);

      this.state = this.getInitialState();
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      console.log(`Setting ${name} to ${value}`)
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
        fetch('/publish', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(this.state),
        });
        event.preventDefault();
        this.setState(this.getInitialState());
    }

    getInitialState = () => {
      return {
        messageType: "ready",
      };
    }

    render() {
      return (
        <div className="col-12 bd-content w-50">
          <h1>Cook</h1>
          <Orders />
      </div>
      );
    }
  }

  const Orders = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:5001/cookorders');
          const ordersData = await response.json();
          setOrders(ordersData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    }, []);
  
  
    return (
      <div>
        <button className="btn btn-primary" onClick={() => setOrders([])}>clear logs</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date/Time</th>
              <th scope="col">Type</th>
              <th scope="col">Order</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.data.date}</td>
                <td>{order.data.messageType}</td>
                <td>{order.data.order}</td>
                <Status order={order}/>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
    )
  }

  export class Status extends React.Component {
    constructor(props) {
      super(props);

      this.state = this.getInitialState();
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      console.log(`Setting ${name} to ${value}`)
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
        fetch('/publish', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(this.state),
        });
        this.setState(this.getInitialState());
    }

    getInitialState = () => {
      return {
        messageType: "ready",
        message: `ready for ${this.props.order.data.order}`
      };
    }

    render() {
      return (
        <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Ready</button>
      );
    }
  }