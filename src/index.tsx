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
import 'react-tooltip/dist/react-tooltip.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ToastContainer limit={1} />
  </React.StrictMode>,
);
