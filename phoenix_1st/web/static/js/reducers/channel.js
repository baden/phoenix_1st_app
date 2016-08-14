import {ACTIONS} from '../actions';

const initialState = {
  messages: [],
  socket: null,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  // combineReducers
  // console.log(["Channel/reducer", state, action]);
  switch (action.type) {
    case ACTIONS.RECEIVE_MESSAGE: {
      let messages = [...state.messages, action.message];
      return Object.assign({}, state, {messages});
    }
  }
  return state;
}
