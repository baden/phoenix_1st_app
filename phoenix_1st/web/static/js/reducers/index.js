import { combineReducers }  from 'redux';
import { routeReducer }     from 'redux-simple-router';
import session              from './session';
import channel              from './channel';

export default combineReducers({
  routing: routeReducer,
  session: session,
  channel: channel,
});

// console.log(["combineReducers", combineReducers]);
