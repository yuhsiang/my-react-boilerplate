/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import meta, {
  updateMetaLoading,
  updateMetaDone,
  updateMetaError,
} from '@app/Provider/global/meta';

import { LOCATION_CHANGE } from 'connected-react-router';

import {
  KEY_LIST_STATE,
  KEY_DETAIL_STATE,
  GET_INDEX_PAGE,
  SET_INDEX_PAGE,
  SET_DETAIL,
  FETCH_DETAIL,
} from './constants';

import ListCrawler from './crawler/ListCrawler';
import DetailCrawler from './crawler/DetailCrawler';

const initialState = fromJS({
  indexMeta: meta,
  [KEY_LIST_STATE]: null,

  detailVisible: false,
  [KEY_DETAIL_STATE]: null,
  detailMeta: meta,
});

function homeReducer(state = initialState, action) {
  const {
    error,
    payload,
  } = action;
  switch (action.type) {
    case GET_INDEX_PAGE:
      return state.update('indexMeta', updateMetaLoading);

    case SET_INDEX_PAGE: {
      if (error) {
        return state.update('indexMeta', updateMetaError);
      }
      const {
        result,
      } = payload;

      const crawler = new ListCrawler(result);
      const homeValue = crawler.parse();

      return state
        .update('indexMeta', updateMetaDone)
        .set(KEY_LIST_STATE, fromJS(homeValue));
    }
    case FETCH_DETAIL:
      return state.update('detailMeta', updateMetaLoading);
    case SET_DETAIL: {
      if (error) {
        return state;
      }
      const {
        result,
      } = payload;
      const crawler = new DetailCrawler(result);
      const detail = crawler.parse();

      return state
        .update('detailMeta', updateMetaDone)
        .set(KEY_DETAIL_STATE, fromJS(detail));
    }

    case LOCATION_CHANGE:
      return state.set(KEY_DETAIL_STATE, null);

    default:
      return state;
  }
}

export default homeReducer;
