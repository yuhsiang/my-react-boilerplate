import {
  ofType,
} from 'redux-observable';
import { of, empty } from 'rxjs';
import {
  flatMap,
  map,
} from 'rxjs/operators';

import { push } from 'connected-react-router';

import {
  removeSession,
} from '@app/services/storage/tokenStorage';

import { showErrorMessage, showHTTPErrorMessage } from '@components/ErrorMessage';

import {
  APP_API_STATUS,
  APP_ERROR_CODE,
} from 'utils/request';

import {
  logoutUser,
} from './actions';

import {
  APP_LOGOUT,
} from './constants';

export const HTTPStatusEpic = (action$) => (
  action$.pipe(
    ofType(APP_API_STATUS),
    flatMap((action) => {
      showHTTPErrorMessage(action.payload);
      if (action.payload === 401) {
        return of(logoutUser());
      }
      return empty();
    })
  )
);

export const ErrorCodeEpic = (action$) => (
  action$.pipe(
    ofType(APP_ERROR_CODE),
    flatMap((action) => {
      showErrorMessage(action.payload.code);
      return empty();
    })
  ));

export const logoutEpic = (action$) => (
  action$.pipe(
    ofType(APP_LOGOUT),
    map(() => {
      removeSession();
      return push('/');
    })
  )
);

export default [
  HTTPStatusEpic,
  ErrorCodeEpic,
  logoutEpic,
];
