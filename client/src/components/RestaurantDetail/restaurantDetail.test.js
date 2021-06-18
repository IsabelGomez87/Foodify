/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import RestaurantDetail from './index';
import { screen, render, fireEvent } from '../../utils/test-utils';
import actionTypes from '../../redux/actions/actionTypes';
import { getRestaurantById, getUserById, createFavorite } from '../../redux/actions/actionCreators';

jest.mock('../../redux/actions/actionCreators');

describe('RestaurantDetail component', () => {
  describe('When is rendered with empty initial state', () => {
    test('should call getRestaurantById', () => {
      getUserById.mockReturnValue({
        type: actionTypes.LOAD_USER,
        user: null,
      });
      render(<RestaurantDetail />, {
        initialState: {
          user: null,
        },
      });
      expect(screen.getByText(/No restaurant available/i)).toBeInTheDocument();
    });

    describe('When is redered with a restaurant as initial state', () => {
      test('Then the restaurant should be in the document', () => {
        getRestaurantById.mockReturnValue({
          type: actionTypes.LOAD_RESTAURANT,
          restaurant: { restaurant: { restaurantId: '1', name: 'Restaurant' } },
        });
        render(
          <RestaurantDetail />, {
            initialState: { restaurant: { restaurantId: '1', name: 'Restaurant' } },
          },
        );
        expect(screen.getByText(/reviews/i)).toBeInTheDocument();
      });
    });

    describe('When booking button is clicked', () => {
      test('Then render the booking details component', () => {
        getRestaurantById.mockReturnValue({
          type: actionTypes.LOAD_RESTAURANT,
          restaurant: { restaurant: { restaurantId: '1', name: 'Restaurant' } },
        });
        render(
          <RestaurantDetail />, {
            initialState: { restaurant: { restaurantId: '1', name: 'Restaurant' } },
          },
        );
        fireEvent.click(screen.getByText(/booking/i));
        expect(screen.getByText(/pax/i)).toBeInTheDocument();
      });
    });

    describe('When is redered with a restaurant as initial state', () => {
      test('Then the today\'s schedule should be in the document', () => {
        getRestaurantById.mockReturnValue({
          type: actionTypes.LOAD_RESTAURANT,
          restaurant: { restaurant: { restaurantId: '1', name: 'Restaurant', opening_hours: { weekday_text: ['lunes: 24 hours', 'martes: 24 hours', 'miércoles: 24 hours', 'jueves: 24 hours', 'viernes: 24 hours', 'sábado: 24 hours', 'domingo: 24 hours'] } } },
        });
        render(
          <RestaurantDetail />, {
            initialState: { restaurant: { restaurantId: '1', name: 'Restaurant', opening_hours: { weekday_text: ['lunes: 24 hours', 'martes: 24 hours', 'miércoles: 24 hours', 'jueves: 24 hours', 'viernes: 24 hours', 'sábado: 24 hours', 'domingo: 24 hours'] } } },
          },
        );
        expect(screen.getByText(/schedule/i)).toBeInTheDocument();
      });
    });
  });
  describe('When deleteToFavorite is clicked', () => {
    test('should call createFavorite', () => {
      getRestaurantById.mockReturnValue({
        type: actionTypes.LOAD_RESTAURANT,
        restaurant: { restaurant: { restaurantId: '1', name: 'Restaurant', opening_hours: { weekday_text: ['lunes: 24 hours', 'martes: 24 hours', 'miércoles: 24 hours', 'jueves: 24 hours', 'viernes: 24 hours', 'sábado: 24 hours', 'domingo: 24 hours'] } } },
      });
      render(
        <RestaurantDetail />, {
          initialState: { restaurant: { restaurantId: '1', name: 'Restaurant', opening_hours: { weekday_text: ['lunes: 24 hours', 'martes: 24 hours', 'miércoles: 24 hours', 'jueves: 24 hours', 'viernes: 24 hours', 'sábado: 24 hours', 'domingo: 24 hours'] } } },
        },
      );
      fireEvent.click(screen.getByTestId(/favorite-button/i));
      expect(createFavorite).toHaveBeenCalled();
    });
  });
});
