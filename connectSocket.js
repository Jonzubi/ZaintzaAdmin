import io from 'socket.io-client';
import { SOCKET_URL } from './src/utils/envConfig';
import store from './store';
import { SetSocket } from './src/redux/actions/socketActions';

export const connectSocket = () => {
  const socket = io(`${SOCKET_URL}`);
  socket.on('connect', () => {
    store.dispatch(SetSocket(socket));
  });
};
