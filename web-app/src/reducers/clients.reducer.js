import { CLIENTS_FETCH, CLIENTS_SHOW, CLIENTS_REJECT } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  timeout: 1000
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENTS_FETCH:
      return {
        ...state
      };

    case CLIENTS_SHOW:
      return {
        ...state,
        data: action.payload,
        timeout: INITIAL_STATE.timeout
      };

    case CLIENTS_REJECT:
      return {
        ...state,
        timeout: action.payload
      };

    default:
      return state;
  }
};
