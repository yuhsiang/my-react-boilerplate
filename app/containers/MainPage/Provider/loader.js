/*
 *
 * Asynchronously loads the reducers and epics for Property
 *
 */
import { getAsyncInjectors } from 'utils/asyncInjectors';

import {
  KEY_REDUCER,
} from './constants';

export default (store) => {
  const { injectReducer, injectEpics } = getAsyncInjectors(store);
  const importModules = Promise.all([
    import(/* webpackMode: "eager" */ './reducer'),
    import(/* webpackMode: "eager" */ './epics'),
  ]);

  return importModules
    .then(([reducer, epics]) => {
      injectReducer(KEY_REDUCER, reducer.default);
      injectEpics(epics.default);
    })
    .catch((err) => {
      console.log(err);
    });
};
