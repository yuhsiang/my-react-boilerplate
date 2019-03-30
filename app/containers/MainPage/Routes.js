import React from 'react';

import { Switch, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import DetailPage from './DetailPage/Loadable';

import routeConfig from './routeConfig';

export default () => (
  <Switch>
    <Route exact path={routeConfig.beauty} component={MainScreen} />
    <Route exact path={routeConfig.beautyDetail} component={DetailPage} />
  </Switch>
);
