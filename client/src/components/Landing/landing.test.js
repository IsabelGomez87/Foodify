/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Landing from './index';
import { screen, render } from '../../utils/test-utils';
import { isLogged } from '../../common/user';

jest.mock('../../common/user');

describe('Landing component', () => {
  test('should contain a title', () => {
    render(<Landing />);
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
  });

  test('should contain a title', () => {
    isLogged.mockReturnValue(true);
    render(<Landing />);
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });
});
