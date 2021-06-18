/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import BookingDetails from './index';
import { screen, render, fireEvent } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { getBookingById, deleteBookingById } from '../../redux/actions/actionCreators';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('BookingDetails component', () => {
  beforeEach(() => {
    getBookingById.mockReturnValue({
      type: actionTypes.LOAD_BOOKING,
      booking: {},
    });
  });

  describe('When is rendered with empty initial state', () => {
    test('should call getBookingById', () => {
      render(<BookingDetails />, {
        initialState: {
          booking: { _id: 1 },
        },
      });
      expect(getBookingById).toHaveBeenCalled();
    });
  });

  describe('When booking cancel button is clicked', () => {
    test('then call deleteBookingById', () => {
      render(<BookingDetails />);
      fireEvent.click(screen.getByTestId(/ok-button/i));
      expect(deleteBookingById).toHaveBeenCalled();
    });
  });

  describe('When booking cancel button is clicked', () => {
    test('then change the className to no-visible', () => {
      const { container } = render(<BookingDetails />);
      fireEvent.click(screen.getByTestId(/close-button/i));
      expect(container.firstChild.children[0]).toHaveClass('edit-booking');
    });
  });
});
