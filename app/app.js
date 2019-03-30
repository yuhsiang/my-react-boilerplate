/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-observable rxjs support
import 'rxjs';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';

import 'sanitize.css/sanitize.css';
import 'font-awesome/css/font-awesome.min.css';
import 'github-markdown-css/github-markdown.css';

// // load antd first load neccessary style only
// import 'antd/lib/message/style';
// import 'antd/lib/button/style';
// import 'antd/lib/col/style';
// import 'antd/lib/row/style';
// import 'antd/lib/select/style';
// import 'antd/lib/input/style';
// import 'antd/lib/modal/style';
// import 'antd/lib/popover/style';
// import 'antd/lib/date-picker/style';
import './theme.less';

// Import selector for `syncHistoryWithStore`
import App from '@containers/App';
// Import Language Provider
import LanguageProvider from '@containers/LanguageProvider';
import history from '@app/utils/history';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import './favicon.ico';
import './manifest.json';
/* eslint-enable import/no-unresolved, import/extensions */

import store from './store';

import { defaultTheme } from './Styled/Settings/theme';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
// import './global-styles';

const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});


// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
      <ThemeProvider theme={defaultTheme}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>,
    MOUNT_NODE
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time

  // Accept Everything For now Because we don't have i18n
  // module.hot.accept();

  module.hot.accept('./i18n', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
  module.hot.accept('containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  runtime.install({
    onUpdating: () => {
    },
    onUpdateReady: () => {
      // Tells to new SW to take control immediately
      // const result = confirm('偵測到更新，要更新嗎?');
      // if (result) {
      //   runtime.applyUpdate();
      // }
    },
    onUpdated: () => {
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
    },
  });
}
