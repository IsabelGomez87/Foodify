/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Header from './index';
import { screen, render, fireEvent } from '../../utils/test-utils';
import { logout } from '../../redux/actions/actionCreators';
import { isLogged } from '../../common/user';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('Header component', () => {
  test('should contain a nav container as data-testId', () => {
    render(<Header />);
    expect(screen.getByTestId(/container__nav/i)).toBeInTheDocument();
  });
  describe('When menu button is clicked', () => {
    test('then change the className to visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(container.firstChild.children[0]);
      expect(container.firstChild.children[1]).toHaveClass('background-menu--visible');
    });
  });
  describe('When home button link is clicked', () => {
    test('then change the className to no visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(screen.getByText(/Home/i));
      expect(container.firstChild.children[1]).toHaveClass('background-menu');
    });
  });
  describe('When close button link is clicked', () => {
    test('then change the className to no visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(screen.getByTestId(/button-save-button close/i));
      expect(container.firstChild.children[1]).toHaveClass('background-menu');
    });
  });
  describe('When login button link is clicked', () => {
    test('then change the className to no visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(screen.getByText(/Login/i));
      expect(container.firstChild.children[1]).toHaveClass('background-menu');
    });
  });
  describe('When logout button link is clicked', () => {
    test('then change the className to no visible', () => {
      isLogged.mockReturnValue(true);
      logout.mockReturnValue();
      render(<Header />);
      fireEvent.click(screen.getByText(/Logout/i));
      expect(logout).toHaveBeenCall();
    });
  });
  describe('When my favorites button link is clicked', () => {
    test('then change the className to no visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(screen.getByText(/My favorites/i));
      expect(container.firstChild.children[1]).toHaveClass('background-menu');
    });
  });
  describe('When my bookings button link is clicked', () => {
    test('then change the className to no visible', () => {
      const { container } = render(<Header />);
      fireEvent.click(screen.getByText(/My bookings/i));
      expect(container.firstChild.children[1]).toHaveClass('background-menu');
    });
  });
});
