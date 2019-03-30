import {
  AUTH_FETCH_LOGIN,
} from './constants';

export const fetchLogin = (auth) => ({
  type: AUTH_FETCH_LOGIN,
  payload: {
    auth,
  },
});
