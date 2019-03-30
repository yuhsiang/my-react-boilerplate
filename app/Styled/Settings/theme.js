/**
 * Theme for the website
 *
 * use open-source lib [styled-breakpoints](https://github.com/mg901/styled-breakpoints)
 * for media-queries
 */

import {
  COLOR_LIGHTER_GRAY,
  COLOR_LIGHT_GRAY,
  VERY_DARK_BLUE,
  COLOR_GRAY,
  COLOR_GRAY_DARK,
  COLOR_GRAY_LIGHT_DARK,
} from './colors';

import {
  BREAK_POINT_SM,
  BREAK_POINT_MD,
  BREAK_POINT_LG,
  BREAK_POINT_XL,
} from './constants';

const breakpoints = {
  [BREAK_POINT_SM]: '576px',
  [BREAK_POINT_MD]: '768px',
  [BREAK_POINT_LG]: '992px',
  [BREAK_POINT_XL]: '1200px',
};

/**
 * Full Button Theme
 * component is at directory
 * components/Button
 */
const fullButtonTheme = {
  fullButtonBackground: VERY_DARK_BLUE,
  fullButtonForeground: '#ffffff',
  fullButtonBorderColor: VERY_DARK_BLUE,
  fullButtonHoverColor: VERY_DARK_BLUE,
  fullButtonActiveColor: VERY_DARK_BLUE,
};

const archTheme = {
  background: 'white',
  borderColor: COLOR_LIGHT_GRAY,
};

const dropdownTheme = {
  dropdownColor: COLOR_GRAY_DARK,
  dropdownBackground: COLOR_LIGHTER_GRAY,
  dropdownHoverColor: `${COLOR_GRAY}aa`,
  dropdownActiveColor: COLOR_GRAY,
  dropdownBorderColor: COLOR_GRAY,
};

const layout = {
  headerHeight: 65,
};

const sideMenuTheme = {
  back: {
    color: 'white',
    background: COLOR_GRAY_LIGHT_DARK,
    hoverBackground: `${COLOR_GRAY_LIGHT_DARK}d0`,
  },
};

const cardTheme = {
  titleBackground: COLOR_LIGHT_GRAY,
};

const modalTheme = {
  borderColor: COLOR_LIGHT_GRAY,
  itemBorderColor: COLOR_LIGHT_GRAY,
};

const capsuleTheme = {
  background: COLOR_LIGHT_GRAY,
};

export const defaultTheme = {
  ...fullButtonTheme,
  ...archTheme,
  ...dropdownTheme,
  modalTheme,
  capsuleTheme,
  sideMenuTheme,
  cardTheme,
  breakpoints,
  layout,
};
