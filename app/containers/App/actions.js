import {
  APP_INIT_LOAD,
  APP_LOGOUT,
} from './constants';

export const appInitLoad = (domain) => ({
  type: APP_INIT_LOAD,
  payload: {
    domain,
  },
});

export const logoutUser = () => ({
  type: APP_LOGOUT,
});
