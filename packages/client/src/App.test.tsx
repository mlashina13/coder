// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

const appContent = 'The coder game!';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('hey'),
  })
);

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
