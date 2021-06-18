/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Footer from './index';
import { screen, render } from '../../utils/test-utils';

describe('Footer component', () => {
  test('should display Github', () => {
    render(<Footer />);
    expect(screen.getByText(/Github/i)).toBeInTheDocument();
  });
});
