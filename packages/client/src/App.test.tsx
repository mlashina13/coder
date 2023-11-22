// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import React from 'react';

const appContent = 'CODER';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('hey'),
  })
);

test('Example test', async () => {
  render(<div>{appContent}</div>);
  expect(screen.getByText(appContent)).toBeDefined();
});
