import {
  ofType,
} from 'redux-observable';
import { of, from } from 'rxjs';
import {
  switchMap,
  mergeMap,
  flatMap,
  catchError,
  startWith,
} from 'rxjs/operators';

import bcrypt from 'bcryptjs';
import genSalt from 'utils/salt';
import { push } from 'connected-react-router';
import { startSubmit, stopSubmit, reset } from 'redux-form';

import {
  ERROR_CODE_MESSAGE,
} from 'components/ErrorMessage';
import routeConfig from '@containers/App/routeConfig';

import {
  authLogin,
  ActionException,
  APP_LOGIN_FAIL,
} from 'utils/request';

import {
  FORM_LOGIN,
  AUTH_FETCH_LOGIN,
} from './constants';

const fetchLogin = (action$, store, { fetchErrorEpic }) => (
  action$.pipe(
    ofType(AUTH_FETCH_LOGIN),
    switchMap((action) => {
      const { payload: {
        auth,
      } } = action;
      const email = auth.get('email');
      const password = auth.get('password');
      const salt = genSalt(email);
      return from(bcrypt.hash(password, salt).then((hash) => ({
        email,
        password: hash,
      }), () => {
        throw new ActionException({
          type: 'error',
        });
      })).pipe(
        mergeMap(authLogin),
        flatMap(() => of(
          reset('c'),
          stopSubmit(FORM_LOGIN),
          push(routeConfig.beauty)
        )),
        catchError((errAction) => {
          if (!errAction.action) {
            return of(stopSubmit(FORM_LOGIN, {
              password: '系統錯誤',
            }));
          }
          if (errAction.action.type === APP_LOGIN_FAIL) {
            return fetchErrorEpic(
              errAction,
              stopSubmit(FORM_LOGIN, {
                password: ERROR_CODE_MESSAGE[errAction.action.payload],
              })
            );
          }

          return fetchErrorEpic(
            errAction,
            stopSubmit(FORM_LOGIN)
          );
        }),
        startWith(startSubmit(FORM_LOGIN))
      );
    })
  )
);

export default [
  fetchLogin,
];
