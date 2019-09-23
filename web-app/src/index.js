import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

import App from './App';

var baseUrl = '';
if (typeof window !== 'undefined') {
  baseUrl = window.location.protocol + '//' + window.location.host;
} else {
  // work out what you want to do server-side...
}

// history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
