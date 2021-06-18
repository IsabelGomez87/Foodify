import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import favoriteReducer from './favoriteReducer';
import restaurantReducer from './restaurantReducer';
import selectedRestaurantReducer from './selectedRestaurantReducer';
import selectedBookingReducer from './selectedBookingReducer';
import selectedFavoriteReducer from './selectedFavoriteReducer';
import newUserReducer from './newUserReducer';
import selectedUserReducer from './selectedUserReducer';
import selectedRestaurantsReducer from './selectedRestaurantsReducer';

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  selectedRestaurants: selectedRestaurantsReducer,
  restaurant: selectedRestaurantReducer,
  bookings: bookingReducer,
  booking: selectedBookingReducer,
  favorites: favoriteReducer,
  favorite: selectedFavoriteReducer,
  newUser: newUserReducer,
  user: selectedUserReducer,
});

export default rootReducer;
