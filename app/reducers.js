/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { connectRouter } from 'connected-react-router/immutable';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appReducer from 'containers/App/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(injectedReducers, history) {
  const routerReducer = connectRouter(history);
  return combineReducers({
    form: formReducer,
    router: routerReducer,
    language: languageProviderReducer,
    app: appReducer,
    ...injectedReducers,
  });
}
