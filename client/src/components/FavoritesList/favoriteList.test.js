/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import FavoritesList from './index';
import { screen, render } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { getUserById } from '../../redux/actions/actionCreators';
import { isLogged } from '../../common/user';

jest.mock('../../redux/actions/actionCreators');
jest.mock('../../common/user');

describe('FavoritesList component', () => {
  describe('When is rendered with empty initial state', () => {
    test('should call getUserById', () => {
      isLogged.mockReturnValue(true);
      getUserById.mockReturnValue({
        type: actionTypes.LOAD_USER,
        user: {},
      });
      render(<FavoritesList />, {
        initialState: {
          user: {},
        },
      });
      expect(screen.getByText(/my favorites/i)).toBeInTheDocument();
    });

    describe('When is rendered with a booking as initial state', () => {
      test('Then the booking title should be in the document', () => {
        isLogged.mockReturnValue(true);
        getUserById.mockReturnValue({
          type: actionTypes.LOAD_USER,
          user: { favorites: [{ restaurant: '1', _id: 1 }] },
        });
        render(
          <FavoritesList />, {
            initialState: { favorites: [{ restaurant: '1', _id: 1 }] },
          },
        );
        expect(screen.getByText(/view details/i)).toBeInTheDocument();
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
      render(<FavoritesList />, {
        initialState: {
          user: {},
        },
      });
      expect(global.window.location.pathname).toEqual('/landing');
    });
  });
});
