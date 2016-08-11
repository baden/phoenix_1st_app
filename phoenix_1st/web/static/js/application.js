import React                    from 'react';
import ReactDOM                 from 'react-dom';

import { browserHistory }       from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import {Provider}               from 'react-redux';
import configureStore           from './store';
import Root                     from './containers/root';

import Hello from './components/hello';
// import List from './components/list';

import { Socket }       from 'phoenix';

let socket = new Socket("/socket", {params: {userToken: "123"}});
console.log(["socket = ", socket]);
socket.connect();

const store = configureStore(browserHistory);
console.log(["store = ", store]);
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('main_container');

const node = (
  <Provider store={store}>
    <Hello name="world" socket={socket} />
    </Provider>
);

ReactDOM.render(node, target);
