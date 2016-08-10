import { combineReducers }  from 'redux';
import { routeReducer }     from 'redux-simple-router';
import session              from './session';

export default combineReducers({
  routing: routeReducer,
  session: session,
});

console.log(["combineReducers", combineReducers]);
