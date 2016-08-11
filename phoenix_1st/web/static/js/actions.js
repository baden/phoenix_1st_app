export const ACTIONS = {
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE'
};

export const reveiveMessage = (message) => (
  {
    type: ACTIONS.RECEIVE_MESSAGE,
    message
  }
);
