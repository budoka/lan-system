import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import clients from './clients.reducer';

const reducers = {
  clients
};

const createRootReducer = history =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

export default createRootReducer;
