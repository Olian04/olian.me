/*
Copied from the google material design docs for designing dark themes.
https://material.io/design/color/dark-theme.html
*/

import { IColorTheme } from '../interfaces/ColorTheme';

const backgroundElevation = {
  E0: '#181818',
  E1: '#1E1E1E',
  E2: '#232323',
  E3: '#252525',
  E4: '#272727',
  E6: '#2C2C2C',
  E8: '#2E2E2E',
  E12: '#333333',
  E16: '#363636',
  E24: '#383838',
};

const textEmphasis = {
  high: 'rgba(255, 255, 255, 0.87)',
  medium: 'rgba(255, 255, 255, 0.6)',
  disabled: 'rgba(255, 255, 255, 0.38)',
};

const highlights = {
  primary: '#640CAB',
  dim: '#582781',
  dark: '#3F046F',
  light: '#9240D5',
  bright: '#A468D5',
};

export const DarkTheme: IColorTheme = {
  background: backgroundElevation,
  text: textEmphasis,
  highlight: highlights,
};
