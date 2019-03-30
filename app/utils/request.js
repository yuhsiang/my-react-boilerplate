import 'whatwg-fetch'; // isomorphic fetch
import { of, from } from 'rxjs';
import {
  catchError,
  mergeMap,
  map,
} from 'rxjs/operators';

import {
  setAuthToken,
  getAuthToken,
  removeSession,
} from 'services/storage/tokenStorage';

import {
  API_URI,
  LOGIN_URL,
} from '../config';

export const APP_LOGIN_FAIL = 'APP_LOGIN_FAIL';
export const APP_ERROR_CODE = 'APP_ERROR_CODE';
export const APP_API_STATUS = 'APP_API_STATUS';

const JSON_HEADER = new Headers({
  'Content-Type': 'application/json',
});

const actionAppStatus = (payload) => ({
  type: APP_API_STATUS,
  payload,
});

export function ActionException(action) {
  this.action = action;
  this.name = 'ActionException';
}

export function authError() {
  removeSession();
  return APP_API_STATUS;
}

export const fetchErrorEpic = (err, ...actions) => of(err.action, ...actions);

const isDataUploadForm = (data) => data instanceof FormData;
const handleRequestError = (err) => {
  if (err instanceof ActionException) {
    throw err;
  }
  if (navigator.onLine) {
    throw new ActionException(actionAppStatus(503));
  } else {
    throw new ActionException(actionAppStatus(420)); // net::ERR_INTERNET_DISCONNECTED
  }
};

export const authLogin = (data) => from(
  fetch(LOGIN_URL, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: JSON_HEADER,
  }).then((response) => response)
).pipe(
  catchError(handleRequestError),
  mergeMap((res) => from(new Promise((resolve, reject) => {
    res.json().then((fulfilled) => {
      resolve({
        status: res.status,
        res: fulfilled,
      });
    }, (err) => reject(err));
  }))),
  map(({
    status,
    res,
  }) => {
    if (status >= 400) {
      throw new ActionException({
        type: APP_LOGIN_FAIL,
        payload: res.code || 2,
      });
    }
    if (res.code) {
      throw new ActionException({
        type: APP_ERROR_CODE,
        payload: res.code,
      });
    }
    setAuthToken(res.data.token);
    return res.data;
  })
);

const getFetchOption = (method, headers, data) => {
  const defaultOption = {
    method,
    headers: new Headers(headers),
  };
  if (method.toLowerCase() === 'get') {
    return defaultOption;
  }

  // upload file
  if (isDataUploadForm(data)) {
    return {
      ...defaultOption,
      body: data,
    };
  }

  // POST json object
  return {
    method,
    headers: new Headers(headers),
    body: JSON.stringify(data),
  };
};

const getAPIURL = (method, url, data, options) => {
  let res = `${getURIByOption(options)}${url}`;
  if (data && method.toLowerCase() === 'get') {
    res = `${res}${getParamsString(data)}`;
  }
  return res;
};

const getHeaders = (data, options) => {
  let res = {
    Authorization: getAuthToken(),
  };
  if (!isDataUploadForm(data)) {
    res = {
      ...res,
      'Content-Type': 'application/json',
    };
  }
  if (typeof options !== 'undefined' && options) {
    res = { ...res, ...options.headers };
  }
  return res;
};

export const request = (action) => privateRequest(action);

export const privateRequest = ({ method, url, data, options, download = false, isText = false }) => {
  const headers = getHeaders(data, options);
  const fetchOption = getFetchOption(method, headers, data);
  const apiURL = getAPIURL(method, url, data, options);

  return from(
    fetch(apiURL, fetchOption).then((response) => {
      if (response.status === 401) {
        throw new ActionException({
          type: authError(),
          payload: 401,
        });
      } else if (response.status >= 500) {
        throw new ActionException(actionAppStatus(response.status));
      }

      return response;
    })
  ).pipe(
    catchError(handleRequestError),
    mergeMap((res) => {
      if (isText) {
        return from(res.text());
      }
      if (download) {
        return from(res.blob());
      }
      return from(res.json());
    }),
    map((res) => {
      if (download || isText) {
        return res;
      }
      if (res.code) {
        throw new ActionException({
          type: APP_ERROR_CODE,
          payload: res,
        });
      }
      return res.data;
    })
  );
};

const getParamsString = (params) => {
  if (typeof params === 'undefined' || !params) {
    return '';
  }
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return query ? `?${query}` : '';
};

const getURIByOption = (options) => {
  if (typeof options === 'undefined' || !options) {
    return API_URI;
  }
  const { customPrefix } = options;

  if (customPrefix) {
    return customPrefix;
  }
  return API_URI;
};
