import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('app renders', () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});
