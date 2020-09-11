import { combineReducers, createStore } from 'redux';
import socket from './src/redux/reducers/socketReducer';

export default createStore(
  combineReducers({
    socket,
  }),
);
