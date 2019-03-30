import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { matchPath } from 'react-router';
import pathToRegexp from 'path-to-regexp';

const history = createHistory();

export const convertPathToRoute = (pathname, matchRoute, toRoute = '', toParams = {}) => {
  const params = getParams(pathname, matchRoute);
  if (!params) {
    return '';
  }
  return generatePathWithParam(toRoute, { ...params, ...toParams });
};

export const getParams = (pathname, matchRoute) => {
  const match = matchPath(pathname, {
    path: matchRoute,
  });
  if (!match || !match.params) {
    return null;
  }
  return match.params;
};

export const generatePathWithParam = (route, params) => {
  try {
    const toPath = pathToRegexp.compile(route);
    return toPath({ ...params });
  } catch (e) {
    console.error(e);
  }
  return '';
};

export const locationProps = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default history;
