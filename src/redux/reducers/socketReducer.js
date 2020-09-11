import { SET_SOCKET } from '../types';

let initialState = {
  socket: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return Object.assign({}, state, { socket: action.payload });
    default:
      return state;
  }
};
