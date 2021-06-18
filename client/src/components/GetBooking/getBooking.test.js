/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import GetBooking from './index';
import { screen, render, fireEvent } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { getRestaurantById, createBooking } from '../../redux/actions/actionCreators';
import { isLogged } from '../../common/user';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('GetBooking component', () => {
  describe('when user is not logged', () => {
    test('should redirect to loggin page', () => {
      global.window = { location: { pathname: null } };
      isLogged.mockReturnValue(false);
      render(<GetBooking />, {
        initialState: {
          restaurant: {},
        },
      });
      expect(global.window.location.pathname).toEqual('/landing');
    });
  });

  beforeEach(() => {
    isLogged.mockReturnValue(true);
    getRestaurantById.mockReturnValue({
      type: actionTypes.LOAD_RESTAURANT,
      restaurant: {},
    });
  });

  describe('When is rendered with empty initial state', () => {
    test('should call getRestaurantById', () => {
      getRestaurantById.mockReturnValue({
        type: actionTypes.LOAD_RESTAURANT,
        restaurant: { _id: 1 },
      });
      render(<GetBooking />, {
        initialState: {
          restaurant: { _id: 1 },
        },
      });
      expect(getRestaurantById).toHaveBeenCalled();
    });
  });

  describe('When booking button is clicked', () => {
    test('should call createBooking', () => {
      createBooking.mockReturnValue({
        type: actionTypes.ADD_BOOKING,
        booking: { booking: { restaurantId: '1', pax: 2, date: '01/01/2021' } },
      });
      render(<GetBooking />);
      const pax = screen.getByTestId(/label-pax/i);
      fireEvent.change(pax, { target: { value: 2 } });
      const date = screen.getByText(/Date/i);
      fireEvent.change(date, { date: '01/01/2020' });
      const time = screen.getByText(/Time/i);
      fireEvent.change(time, { time: '11:30' });
      const comments = screen.getByTestId(/textarea-comments/i);
      fireEvent.change(comments, { target: { value: 'alergic' } });
      fireEvent.click(screen.getByText(/confirm/i));
      expect(createBooking).toHaveBeenCalled();
    });
  });

  describe('When booking button is clicked', () => {
    test('then render the popupinfo', () => {
      createBooking.mockReturnValue({
        type: actionTypes.ADD_BOOKING,
        booking: { booking: { restaurantId: '1', pax: 2, date: '01/01/2021' } },
      });
      render(<GetBooking />);
      fireEvent.click(screen.getByText(/confirm/i));
      expect(screen.getByTestId(/popupinfo-container/i)).toBeInTheDocument();
    });
  });

  describe('When comments button is clicked', () => {
    test('then change the className to visible', () => {
      render(<GetBooking />);
      const container = screen.getByTestId(/label-comments/i);
      fireEvent.click(screen.getByText(/Write your comments here/i));
      expect(container.children[1]).toHaveClass('form__comments');
    });
  });

  describe('When close-button is clicked', () => {
    test('then hidden the modal', () => {
      render(<GetBooking />);
      const container = screen.getByTestId(/label-comments/i);
      fireEvent.click(screen.getByTestId(/ok-button/i));
      expect(container.children[1]).toHaveClass('form__comments');
    });
  });
});
