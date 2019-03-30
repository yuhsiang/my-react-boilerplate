import {
  ofType,
} from 'redux-observable';
import {
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';

import {
  GET_INDEX_PAGE,
  GET_PAGE,
  FETCH_DETAIL,
} from './constants';

import {
  setDetail,
  setIndexPage,
} from './actions';

const fetchIndexPage = (action$, store, { request, fetchErrorEpic }) => action$.pipe(
  ofType(GET_INDEX_PAGE),
  switchMap(({ payload }) => request({
    method: 'get',
    url: `/bbs/${payload.category}/index.html`,
    isText: true,
  }).pipe(
    map((data) => setIndexPage(null, data)),
    catchError((error) => fetchErrorEpic(
      error,
      setIndexPage(error)),
    ))
  )
);

const fetchPage = (action$, store, { request, fetchErrorEpic }) => action$.pipe(
  ofType(GET_PAGE),
  switchMap(({ payload }) => request({
    method: 'get',
    url: payload.pageURL,
    isText: true,
  }).pipe(
    map((data) => setIndexPage(null, data)),
    catchError((error) => fetchErrorEpic(
      error,
      setIndexPage(error)
    )
    ))
  )
);

const fetchDetail = (action$, store, { request, fetchErrorEpic }) => action$.pipe(
  ofType(FETCH_DETAIL),
  switchMap(({ payload }) => request({
    method: 'get',
    url: payload.detailURL,
    isText: true,
  }).pipe(
    map((data) => setDetail(null, data)),
    catchError((error) => fetchErrorEpic(
      error,
      setDetail(error)
    ))
  ))
);

export default [
  fetchIndexPage,
  fetchPage,
  fetchDetail,
];
