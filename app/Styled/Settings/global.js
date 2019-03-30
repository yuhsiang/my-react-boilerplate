import { createGlobalStyle } from 'styled-components';

export const FEATURE_TITLE_HEIGHT = 45;
export const FEATURE_TITLE_TEXT_HEIGHT = 25;

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-size: 16px;
  }

  body {
    font-family: 'Microsoft JhengHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Microsoft JhengHei', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  ul{
    padding: 0;
    margin: 0;
    list-style: none;
  }

  #app {
    height: 100%;
    min-width: 100%;
    background-color: white;
    position:relative;
    white-space: nowrap;
  }

  p,
  label {
    line-height: 1.5em;
  }
  nav, .navbar {
    border-radius: 0;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid #eee;
  }
  .dmp-markdown {
    font-size: 14px;
    line-height: 1.4;
    white-space: normal;
    ul {
      list-style-type: disc;
      list-style-position: inside;
    }
    ol {
      list-style-type: decimal;
      list-style-position: inside;
    }
    ul ul, ol ul {
      list-style-type: circle;
      list-style-position: inside;
      margin-left: 15px;
    }
    ol ol, ul ol {
      list-style-type: lower-latin;
      list-style-position: inside;
      margin-left: 15px;
    }
  }

  .dmp-relative{
    position: relative;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }`;
