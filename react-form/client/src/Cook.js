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
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-6">
              <h2>Food</h2>
            </div>
            <div className="col-6 d-flex justify-content-between">
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Select status</label>
                <select className="custom-select custom-select-lg mb-3" name="messageType" onChange={this.handleInputChange} value={this.state.messageType}>
                  <option value="ready">ready</option>
                  <option value="outofstock">out of stock</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
      </div>
      );
    }
  }