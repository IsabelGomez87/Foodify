/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import CustomButton from './CustomButton';
import { screen, render } from '../../../utils/test-utils';

describe('CustomButton component', () => {
  test('should contain a dataTestId', () => {
    render(<CustomButton />);
    expect(screen.getByTestId(/button-undefined/i)).toBeInTheDocument();
  });
});
