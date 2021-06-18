/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import BookingsList from './index';
import { screen, render } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { getUserById } from '../../redux/actions/actionCreators';
import { isLogged } from '../../common/user';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('BookingsList component', () => {
  describe('When is rendered with empty initial state', () => {
    test('should call getUserById', () => {
      isLogged.mockReturnValue(true);
      getUserById.mockReturnValue({
        type: actionTypes.LOAD_USER,
        user: {},
      });
      render(<BookingsList />, {
        initialState: {
          user: {},
        },
      });
      expect(screen.getByText(/my bookings/i)).toBeInTheDocument();
    });

    describe('When is rendered with a booking as initial state', () => {
      test('Then the booking title should be in the document', () => {
        isLogged.mockReturnValue(true);
        getUserById.mockReturnValue({
          type: actionTypes.LOAD_USER,
          user: { bookings: [{ restaurant: '1', pax: 1 }] },
        });
        render(
          <BookingsList />, {
            initialState: { bookings: [{ restaurant: '1', pax: 1 }] },
          },
        );
        expect(screen.getByText(/pax/i)).toBeInTheDocument();
      });
    });
  });

  describe('when user is not logged', () => {
    test('should redirect to loggin page', () => {
      global.window = { location: { pathname: null } };
      isLogged.mockReturnValue(false);
      getUserById.mockReturnValue({
        type: actionTypes.LOAD_USER,
        user: {},
      });
      render(<BookingsList />, {
        initialState: {
          user: {},
        },
      });
      expect(global.window.location.pathname).toEqual('/landing');
    });
  });
});
