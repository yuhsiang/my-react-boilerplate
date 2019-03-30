/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';


import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import createReducer from '../reducers';
import { request, fetchErrorEpic } from '../utils/request';

import initialEpics from '../epics';

export default function configureStore(initialState = {}, history) {
  // Create root epic that accepts async injection
  const epic$ = new BehaviorSubject(combineEpics(...initialEpics));
  const rootEpic = (action$, store, deps) => epic$.pipe(mergeMap((epic) => epic(action$, store, deps)));
  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      request,
      fetchErrorEpic,
    },
  });

  // Create the store with two middlewares
  // 1. epicMiddleware: Makes redux-observable work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    epicMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `connected-react-router` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer([], history),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  epicMiddleware.run(rootEpic);

  // Extensions
  // store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.asyncEpics = []; // Async epics registry
  store.addEpic = (epic) => {
    if (!store.asyncEpics.includes(epic)) {
      epic$.next(epic);
      store.asyncEpics.push(epic);
    }
  };
  store.history = history;

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers, store.history));
    });
  }

  return store;
}
