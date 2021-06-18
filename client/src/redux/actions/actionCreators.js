/* eslint-disable no-console */
import axios from 'axios';
import actionTypes from './actionTypes';
import { setLogin, setLogout } from '../../common/user';

const URL = process.env.REACT_APP_URL;

export function loadRestaurants() {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/restaurants`);
      dispatch({
        type: actionTypes.LOAD_RESTAURANTS,
        restaurants: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_RESTAURANTS_ERROR,
      });
    }
  };
}

export function loadSelectedRestaurants(data) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_RESTAURANTS,
      selectedRestaurants: data,
    });
  };
}

export function getRestaurantById(restaurantId) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/restaurants/${restaurantId}`);
      dispatch({
        type: actionTypes.LOAD_RESTAURANT,
        restaurant: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_RESTAURANT_ERROR,
      });
    }
  };
}

export function loadBookings(token) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.LOAD_BOOKINGS,
        bookings: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_BOOKINGS_ERROR,
      });
    }
  };
}

export function getBookingById(bookingId, token) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.LOAD_BOOKING,
        booking: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_BOOKING_ERROR,
      });
    }
  };
}

export function createBooking(newBooking, token, userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/bookings`, { booking: newBooking, userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.ADD_BOOKING,
        booking: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_BOOKING_ERROR,
      });
    }
  };
}

export function updateBookingById(bookingId, token) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.UPDATE_BOOKING,
        booking: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_BOOKING_ERROR,
      });
    }
  };
}

export function deleteBookingById(bookingId, token) {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.DELETE_BOOKING,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_BOOKING_ERROR,
      });
    }
  };
}

export function loadFavorites(token) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.LOAD_FAVORITES,
        favorites: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_FAVORITES_ERROR,
      });
    }
  };
}

export function getFavoriteById(favoriteId, token) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/favorite/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.LOAD_FAVORITE,
        favorite: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_FAVORITE_ERROR,
      });
    }
  };
}

export function createFavorite(newFavorite, token, userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/favorites`, { favorite: newFavorite, userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.ADD_FAVORITE,
        favorite: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_FAVORITE_ERROR,
      });
    }
  };
}

export function deleteFavoriteById(favoriteId, token) {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.DELETE_FAVORITE,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_FAVORITE_ERROR,
      });
    }
  };
}

export function signupUser(newUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/signup`, newUser);
      dispatch({
        type: actionTypes.SIGNUP_USER,
        user: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SIGNUP_USER_ERROR,
      });
    }
  };
}

export function loginUser(newUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/login`, newUser);
      dispatch({
        type: actionTypes.LOGIN_USER,
        user: data,
      });
      setLogin(data.token, data.user._id);
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
      });
    }
  };
}

export function logout() {
  return async () => {
    try {
      await axios.get(`${URL}/logout`);
      setLogout();
    } catch (error) {
      console.error('logout', error);
    }
  };
}

export function getUserById(userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: actionTypes.LOAD_USER,
        user: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_USER_ERROR,
      });
    }
  };
}
