import React from 'react';

import { Switch, Route } from 'react-router-dom';
import EntryPage from '@containers/Entry';
import LoginPage from '@containers/LoginPage/Loadable';
import MainPage from '@containers/MainPage/Loadable';

import routeConfig from './routeConfig';

/**
 * Your can add your register page here
 *
 * careful route '/' is exact
 */
export default () => (
  <Switch>
    <Route path={routeConfig.loginPage} component={LoginPage} />
    <Route path={routeConfig.beauty} component={MainPage} />
    <Route exact path={routeConfig.entry} component={EntryPage} />
    <Route path={'*'} component={() => <div>Not Found</div>}/>
  </Switch>
);
