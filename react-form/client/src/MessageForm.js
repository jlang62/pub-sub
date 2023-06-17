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

import React from 'react';

export class MessageForm extends React.Component {
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
        messageType: "asap",
        message: "",
        order: "",
        date: new Date().toLocaleString()
      };
    }

    

    render() {
      return (
        <div className="col-12 bd-content w-50">
          <h1>Food Food Food</h1>
          <h3>{this.state.date}</h3>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Select delivery time</label>
            <select className="custom-select custom-select-lg mb-3" name="messageType" onChange={this.handleInputChange} value={this.state.messageType}>
              <option value="asap">asap</option>
              <option value="hurry">hurry</option>
              <option value="hour">in 1 hour</option>
            </select>
          </div>
          <div className="form-group">
            <label>Enter address</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="message" onChange={this.handleInputChange} value={this.state.message} placeholder="Enter address here"></textarea>
          </div>
          <div className="form-group">
            <label>Enter food order</label>
            <textarea className="form-control" id="exampleFormControlTextarea2" rows="1" name="order" onChange={this.handleInputChange} value={this.state.order} placeholder="Enter order here"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      );
    }
  }