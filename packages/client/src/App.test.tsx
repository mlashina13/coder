// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-canvas-mock';

const appContent = 'CODER';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('hey'),
  })
);

Object.assign(global, { TextDecoder, TextEncoder });

test('Example test', async () => {
  render(<div>{appContent}</div>);
  expect(screen.getByText(appContent)).toBeDefined();
});

test('Canvas test', () => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');
  expect(context).not.toBeUndefined();
});
