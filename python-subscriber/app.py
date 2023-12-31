#
# Copyright 2021 The Dapr Authors
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import flask
from flask import request, jsonify
from flask_cors import CORS
import json
import sys

app = flask.Flask(__name__)
CORS(app)

@app.route('/dapr/subscribe', methods=['GET'])
def subscribe():
    subscriptions = [{'pubsubname': 'pubsub', 'topic': 'asap', 'route': 'asap'}, {'pubsubname': 'pubsub', 'topic': 'C', 'route': 'C'}]
    return jsonify(subscriptions)

@app.route('/asap', methods=['POST'])
def a_subscriber():
    print(f'asap: {request.json}', flush=True)
    print('Received message I changed this "{}" on topic "{}"'.format(request.json['data']['message'], request.json['topic']), flush=True)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/C', methods=['POST'])
def c_subscriber():
    print(f'C: {request.json}', flush=True)
    print('Received message I changed this "{}" on topic "{}"'.format(request.json['data']['message'], request.json['topic']), flush=True)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

app.run(port=5001)
