import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, store } from './store';
import { App } from './App';
import './styles/globalStyles.scss';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={createStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
