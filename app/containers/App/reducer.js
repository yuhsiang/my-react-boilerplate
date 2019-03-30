import { fromJS } from 'immutable';

import meta, {
//   updateMetaLoading,
//   updateMetaDone,
//   updateMetaError,
} from 'Provider/global/meta';

import {
  APP_LOGOUT,
} from './constants';


export const getInitialState = () => fromJS({
  loadingMeta: meta,
});

const reducer = (state = getInitialState(), action) => {
  // const {
  //   error,
  // } = action;
  switch (action.type) {
    case APP_LOGOUT:
      return getInitialState();

    default:
      return state;
  }
};

export default reducer;
