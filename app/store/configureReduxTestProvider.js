import React from 'react';
import { render } from 'react-testing-library';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@app/Styled/Settings/theme';

function renderWithRedux(
  ui,
  store,
) {
  return render(
    <Provider
      store={store}
      context={ReactReduxContext}
    >
      {ui}
    </Provider>);
}

function renderWithThemeRedux(
  ui,
  store,
) {
  return render(
    <Provider
      store={store}
      context={ReactReduxContext}
    >
      <ThemeProvider theme={defaultTheme}>
        {ui}
      </ThemeProvider>
    </Provider>);
}

function renderWithTheme(ui) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      {ui}
    </ThemeProvider>
  );
}




export { renderWithRedux, renderWithThemeRedux, renderWithTheme };

