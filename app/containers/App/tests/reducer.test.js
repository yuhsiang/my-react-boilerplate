
import expect from 'expect';
import {
} from 'Provider/global/meta';

import appReducer, { getInitialState } from '../reducer';
import {
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = getInitialState();
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });
});
