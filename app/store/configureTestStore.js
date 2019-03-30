/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { request, fetchErrorEpic } from '../utils/request';

import initialEpics from '../epics';
import history from '../utils/history';

export default function configureTestStore(
  reducers,
  initialState = {},
  epics = initialEpics,
  dependencies = { request, fetchErrorEpic },
) {
  // Create root epic that accepts async injection
  const epic$ = new BehaviorSubject(combineEpics(epics));
  const rootEpic = (action$, store, deps) => epic$.pipe(mergeMap((epic) => epic(action$, store, deps)));
  const epicMiddleware = createEpicMiddleware({
    dependencies,
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

  const store = createStore(
    reducers,
    fromJS(initialState),
    ...enhancers,
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

  return store;
}
