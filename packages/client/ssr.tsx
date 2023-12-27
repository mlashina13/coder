import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { App } from './src/App';

export function render() {
  return renderToString(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
