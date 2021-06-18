/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import List from './index';
import { screen, render } from '../../utils/test-utils';

describe('List component is render with empty data', () => {
  test('should display error message', () => {
    render(<List />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  describe('List component is render with a data', () => {
    test('should render a component with restaurants', () => {
      const typeOf = 'restaurant';
      const data = [{ name: 'restaurant' }];
      render(<List data={data} typeOfInfo={typeOf} />);
      expect(screen.getByTestId('restaurant-container')).toBeInTheDocument();
    });
  });

  describe('List component is render with a data', () => {
    test('should render a component with bookings', () => {
      const typeOf = 'booking';
      const data = [{ pax: 3, restaurant: { _id: 2 } }];
      render(<List data={data} typeOfInfo={typeOf} />);
      expect(screen.getByTestId('restaurant-container')).toBeInTheDocument();
    });
  });

  describe('List component is render with a data', () => {
    test('should render a component with favorites', () => {
      const typeOf = 'favorite';
      const data = [{ _id: 3, restaurant: { _id: 2 } }];
      render(<List data={data} typeOfInfo={typeOf} />);
      expect(screen.getByTestId('restaurant-container')).toBeInTheDocument();
    });
  });
});
