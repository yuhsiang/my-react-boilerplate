import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import routeConfig from '@containers/App/routeConfig';

import {
  isLoggedIn,
} from 'services/storage/tokenStorage';

const EnterpriseFlowPage = () => {
  const loggedIn = isLoggedIn();

  return (
    <Switch>
      {!loggedIn && <Redirect to={routeConfig.loginPage} />}
      {loggedIn && <Redirect to={routeConfig.beauty} />}
    </Switch>
  );
};

export default EnterpriseFlowPage;
