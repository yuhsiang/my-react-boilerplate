/**
 * Add your initial Epics Here
 *
 * Default Epic Are:
 *
 * appEpics
 * crawlerEpics
 */

import loginPageEpics from './containers/LoginPage/epics';
import appEpics from './containers/App/epics';

export default [
  ...loginPageEpics,
  ...appEpics,
];
