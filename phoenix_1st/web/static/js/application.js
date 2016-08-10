import React                    from 'react';
import ReactDOM                 from 'react-dom';

import Hello from './components/hello';

const target = document.getElementById('main_container');

const node = <div>
<Hello />
Hello, world!!!
</div>;

ReactDOM.render(node, target);

var state = {foo: "bar"};
console.log("Hallo state=", state);

var action = (state) => ({ ...state, cool: "down"});
// var action = function(state) {
//   var _s = Object.assign({}, state);
//   _s.cool = "down";
//   return _s;
// }

var newState = action(state);
console.log("newState=", newState);
