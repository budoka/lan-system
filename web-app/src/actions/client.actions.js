import { CLIENTS_FETCH, CLIENTS_SHOW, CLIENTS_REJECT } from './types';

import { clientServices } from '../services';

const timeout = 5 * 1000;

const showClients = () => async dispatch => {
  dispatch(request());

  await clientServices
    .getClients()
    .then(data => {
      //console.log(data);
      dispatch(success(data));
    })
    .catch(error => {
      //console.error(error);
      console.error('Server Unavailable');
      dispatch(failure(timeout));
    })
    .finally(function() {
      // always executed
    });

  function request() {
    return { type: CLIENTS_FETCH };
  }

  function success(payload) {
    return { type: CLIENTS_SHOW, payload };
  }

  function failure(payload) {
    return { type: CLIENTS_REJECT, payload };
  }
};

const clientActions = {
  showClients
};

export default clientActions;
