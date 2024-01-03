import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { buildProviderTree } from './utils/buildProviderTree';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import Router from './router/Router';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ProviderTree = buildProviderTree([
  [Provider, { store }],
  [ThemeProvider, { theme }],
  [BrowserRouter, null],
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ProviderTree>
      <Router />
    </ProviderTree>
  </React.StrictMode>,
);
