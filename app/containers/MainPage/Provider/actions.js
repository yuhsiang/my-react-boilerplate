/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GET_INDEX_PAGE,
  SET_INDEX_PAGE,
  SET_DETAIL,

  OPEN_DETAIL,
  CLOSE_DETAIL,
  GET_PAGE,

  FETCH_DETAIL,
} from './constants';

export const getIndexPage = (category) => ({
  type: GET_INDEX_PAGE,
  payload: {
    category,
  },
});

export const setIndexPage = (error, result) => ({
  error,
  type: SET_INDEX_PAGE,
  payload: {
    result,
  },
});

export const getPage = (pageURL) => ({
  type: GET_PAGE,
  payload: {
    pageURL,
  },
});

export const openDetail = (detailURL) => ({
  type: OPEN_DETAIL,
  payload: {
    detailURL,
  },
});


export const fetchDetail = (detailURL) => ({
  type: FETCH_DETAIL,
  payload: {
    detailURL,
  },
});



export const closeDetail = () => ({
  type: CLOSE_DETAIL,
});

export const setDetail = (error, result) => ({
  error,
  type: SET_DETAIL,
  payload: {
    result,
  },
});
