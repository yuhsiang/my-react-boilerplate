/**
 * Test store addons
 */

// import { browserHistory } from 'react-router-dom';
import history from 'utils/history';
import configureStore from '../store/configureStore';

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    configureStore(undefined, history);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
