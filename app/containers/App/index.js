

/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/**
* withRouter
* https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
*/
// React
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GlobalStyle } from 'Styled/Settings/global';

import Routes from './Routes';

const App = ({
  location,
}) => (
  <>
    <GlobalStyle />
    <Routes
      location={location}
    />
  </>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

App.defaultProps = {
  location: {
    pathname: '',
  },
};


export default withRouter(App);
