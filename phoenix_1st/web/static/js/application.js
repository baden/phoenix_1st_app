import React                    from 'react';
import ReactDOM                 from 'react-dom';

import { browserHistory }       from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './store';
import Root                     from './containers/root';

import Hello from './components/hello';
// import List from './components/list';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('main_container');

const node = <div>
<Hello name="world"/>
Hello, world!!!
</div>;

ReactDOM.render(node, target);

// var state = {foo: "bar"};
// console.log("Hallo state=", state);

// var action = (state) => ({ ...state, cool: "down"});
// var action = function(state) {
//   var _s = Object.assign({}, state);
//   _s.cool = "down";
//   return _s;
// }

// var newState = action(state);
// console.log("newState=", newState);

// import Channel from "./services/channel";
// console.log("======== Channel=", Channel);
