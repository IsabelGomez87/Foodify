/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Home from './index';
import { screen, render } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { loadRestaurants, loadSelectedRestaurants } from '../../redux/actions/actionCreators';

jest.mock('../../redux/actions/actionCreators');

describe('Home component', () => {
  test('should contain a list of restaurants', () => {
    render(<Home />, {
      initialState: {
        restaurants: [{ name: 'Restaurant' }],
      },
    });
    expect(screen.getByText(/- restaurants -/i)).toBeInTheDocument();
  });

  describe('When is rendered with a list restaurants as initial state', () => {
    test('should call loadRestaurants', () => {
      loadRestaurants.mockReturnValue({
        type: actionTypes.LOAD_RESTAURANTS,
        restaurants: [],
      });
      render(<Home />, {
        initialState: {
          restaurants: [],
        },
      });
      expect(loadRestaurants).toHaveBeenCalled();
    });
  });

  describe('When is rendered with a selected restaurants', () => {
    beforeEach(() => {
      loadRestaurants.mockReturnValue({
        type: actionTypes.LOAD_RESTAURANTS,
        restaurants: null,
      });
    });
    test('should call loadSelectedRestaurants', () => {
      loadSelectedRestaurants.mockReturnValue({
        type: actionTypes.SELECTED_RESTAURANTS,
        selectedRestaurants: [{}],
      });
      render(<Home />, {
        initialState: {
          selectedRestaurants: [],
        },
      });
      expect(loadSelectedRestaurants).toHaveBeenCalled();
    });
  });
});
