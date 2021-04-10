import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';
import { colorTheme } from '../state/colorTheme';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#28262F',
      paper: '#3F3E43',
    },
    primary: {
      main: '#0366D6',
      dark: '#182030',
    },
    secondary: {
      main: '#2EA043',
    },
    info: {
      main: 'rgba(63,62,67,1)',
    },
    text: {
      primary: 'rgba(247,246,244,1)',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const useTheme = () => {
  const theme = useRecoilValue(colorTheme);

  switch (theme) {
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      console.error(
        `Unknown color theme. Expected "light" or "dark" but got "${theme}"`
      );
      return darkTheme;
  }
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ThemeProvider = (props: Props) => {
  const theme = useTheme();
  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  );
};
