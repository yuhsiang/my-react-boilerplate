import { of } from 'rxjs';
import { combineReducers } from 'redux-immutable';
import mainReducer from 'containers/App/reducer';
import { marbleTest } from 'Provider/testEpicTools';

import { setAuthToken } from '@app/services/storage/tokenStorage';

import mockLocalStorage from '@app/services/storage/mockLocalStorage';

import { fetchUserEpic } from '../epics';

import {
  fetchUser,
  setUser,
  fetchGroups,
} from '../actions';

describe('fetchUserEpic', () => {
  const reducers = combineReducers({
    app: mainReducer,
  });
  beforeEach(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should fulfill user and fetch groups', () => {
    const resetMockLocalStorage = mockLocalStorage();
    setAuthToken('myauth');
    const initialState = reducers(undefined, { type: '' });
    const dependencies = {
      request: () => of({ user: {} }),
      fetchErrorEpic: () => of(),
    };
    marbleTest({
      epic: fetchUserEpic,
      actions: 'a--',
      states: 's--',
      expected: '(12)--',
      dependencies,
      values: {
        a: fetchUser(),
        s: initialState,
        1: setUser(null, {}),
        2: fetchGroups(),
      },
    });
    resetMockLocalStorage();
  });
});
