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

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Dapr publishes messages with the application/cloudevents+json content-type
app.use(bodyParser.json({ type: 'application/*+json' }));

const port = 3000;
const logs = [];

app.get('/api/logs', (_req, res) => {
  res.json({ logs });
});


app.get('/dapr/subscribe', (_req, res) => {
    res.json([
      {
        pubsubname: 'pubsub',
        topic: 'asap',
        route: 'asap',
      },
      {
        pubsubname: 'pubsub',
        topic: 'hurry',
        route: 'hurry',
      },
      {
        pubsubname: 'pubsub',
        topic: 'hour',
        route: 'hour',
      },
      {
        pubsubname: 'pubsub',
        topic: 'ready',
        route: 'ready',
      },
    ]);
  });
  
  app.post('/asap', (req, res) => {
    logs.push({type: 'asap', address: req.body.data.message});
    console.log('Received ASAP delivery request:');
    console.log('Address:', req.body.data.message);
    console.log('Order:', req.body.data.order);
    res.sendStatus(200);
  });
  
  app.post('/hurry', (req, res) => {
    logs.push({type: 'hurry', address: req.body.data.message});
    console.log('Received Hurry delivery request:');
    console.log('Address:', req.body.data.message);
    console.log('Order:', req.body.data.order);
    res.sendStatus(200);
  });

  app.post('/hour', (req, res) => {
    logs.push({type: 'hour', address: req.body.data.message});
    console.log('Received in 1 Hour delivery request:');
    console.log('Address:', req.body.data.message);
    console.log('Order:', req.body.data.order);
    res.sendStatus(200);
  });

  app.post('/ready', (req, res) => {
    console.log('Received status:');
    console.log('Status:', req.body.data.messageType);
    res.sendStatus(200);
  });

app.listen(port, () => console.log(`Hello World: Node App listening on port ${port}!`));
