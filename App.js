import React, { useEffect } from 'react';
import Router from './Router';
import store from './store';
import { Provider } from 'react-redux';
import { connectSocket } from './connectSocket';

const App = () => {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
