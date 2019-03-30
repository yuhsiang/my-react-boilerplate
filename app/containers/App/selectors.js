import { createSelector } from 'reselect';
import {
  LOADED,
  LOADING,
  ERROR,
} from 'Provider/global/meta';

export const selectApp = (state) => state.get('app');
export const selectUser = (state) => {
  const app = selectApp(state);
  if (!app) {
    return null;
  }
  return app.get('user');
};

const makeSelectEnterpriseDomain = () => createSelector(
  selectApp,
  (globalState) => globalState.get('enterpriseDomain')
);

const selectAppState = () => createSelector(
  selectApp,
  (globalState) => globalState
);

const selectUserState = () => createSelector(
  selectApp,
  (globalState) => globalState.get('user')
);

export const makeSelectIsEnterpriseAdmin = () => createSelector(
  selectApp,
  (globalState) => globalState.getIn(['enterprise', 'admin'])
);

export const selectIsLoadingUser = () => createSelector(
  selectApp,
  (globalState) => globalState.getIn(['userMeta', LOADING])
);

export const selectHasLoadedUser = () => createSelector(
  selectApp,
  (globalState) => globalState.getIn(['userMeta', LOADED])
);

export const makeSelectHasLoadUserError = () => createSelector(
  selectApp,
  (globalState) => globalState.getIn(['userMeta', ERROR])
);

const selectGroups = () => createSelector(
  selectApp,
  (globalState) => globalState.get('groups')
);

const makeSelectHasMultipleGroups = () => createSelector(
  selectApp,
  (globalState) => {
    const groups = globalState.get('groups');
    return !groups || groups.size > 1;
  }
);

const selectActiveGroup = () => createSelector(
  selectApp,
  (globalState) => {
    const id = globalState.get('activeGroup');
    const groups = globalState.get('groups');
    if (groups) {
      return groups.find((item) => item.get('id') === id);
    }
    return null;
  }
);

const makeSelectActiveGroupName = () => createSelector(
  selectApp,
  (globalState) => {
    const id = globalState.get('activeGroup');
    const groups = globalState.get('groups');
    if (groups) {
      const foundGroup = groups.find((item) => item.get('id') === id);
      return foundGroup ? foundGroup.get('name') : '';
    }
    return '';
  }
);

const selectIsLoadingGroup = () => createSelector(
  selectApp,
  (globalState) => globalState.get('isLoadingGroup')
);

export const makeSelectRoute = () => createSelector(
  (state) => state.get('route'),
  (route) => route.get('location'),
);

export const makeSelectEnterpriseName = () => createSelector(
  selectApp,
  (appState) => appState.getIn(['enterprise', 'name'])
);

export {
  selectAppState,
  selectUserState,
  selectGroups,
  selectActiveGroup,
  selectIsLoadingGroup,
  makeSelectActiveGroupName,
  makeSelectEnterpriseDomain,
  makeSelectHasMultipleGroups,
};
