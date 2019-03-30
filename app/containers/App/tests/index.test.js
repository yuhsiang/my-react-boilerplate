import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import { ConnectedRouter } from 'connected-react-router/immutable';

import configureTestStore from '@app/store/configureTestStore';
import { renderWithThemeRedux } from '@app/store/configureReduxTestProvider';
import history from '@app/utils/history';
import createReducer from '@app/reducers';
import App from '../index';

const reducers = createReducer([], history);
const store = configureTestStore(reducers);

describe('<App />', () => {
  afterEach(cleanup);
  it('should render app with loading spinner', async () => {
    const { container } = renderWithThemeRedux(
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>,
      store
    );
    expect(container).toMatchSnapshot();
  });
});
