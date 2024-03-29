import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import 'fontsource-roboto';

import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { NavProvider } from './providers/NavProvider';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AuthProvider />
      <NavProvider />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
