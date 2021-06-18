/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Login from './index';
import { screen, render, fireEvent } from '../../utils/test-utils';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('Login component', () => {
  describe('When is rendered with a empty initial state', () => {
    test('Then my account should be in the document', () => {
      render(<Login />);
      expect(screen.getByText(/my account/i)).toBeInTheDocument();
    });
  });

  describe('When login button is clicked', () => {
    test('should call loginUser', () => {
      render(<Login />);
      fireEvent.click(screen.getByTestId('button-login'), { target: { value: 'user' } });
    });
  });
});
