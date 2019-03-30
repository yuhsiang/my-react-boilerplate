/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { LOADED, LOADING } from '@app/Provider/global/meta';
import {
  KEY_REDUCER,
  KEY_LIST_STATE,
  KEY_DETAIL_STATE,
} from './constants';
const selectHome = (state) => state.get(KEY_REDUCER);


export const makeSelectIsLoadingDetail = () => createSelector(
  selectHome,
  (state) => state.getIn(['detailMeta', LOADING]),
);

export const makeSelectIsLoadingIndex = () => createSelector(
  selectHome,
  (state) => state.getIn(['indexMeta', LOADING]),
);

export const makeSelectHasLoadedIndex = () => createSelector(
  selectHome,
  (state) => state.getIn(['indexMeta', LOADED]),
);

export const makeSelectListState = () => createSelector(
  selectHome,
  (state) => state.getIn([KEY_LIST_STATE, 'list']),
);

export const makeSelectNextLink = () => createSelector(
  selectHome,
  (state) => state.getIn([KEY_LIST_STATE, 'nextLink']),
);

export const makeSelectPrevLink = () => createSelector(
  selectHome,
  (state) => state.getIn([KEY_LIST_STATE, 'prevLink']),
);

export const makeSelectDetail = () => createSelector(
  selectHome,
  (state) => state.get(KEY_DETAIL_STATE),
);
