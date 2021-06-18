import axios from 'axios';
import {
  loadRestaurants,
  loadSelectedRestaurants,
  getRestaurantById,
  createBooking,
  getBookingById,
  loadBookings,
  updateBookingById,
  deleteBookingById,
  loadFavorites,
  getFavoriteById,
  createFavorite,
  deleteFavoriteById,
  signupUser,
  loginUser,
  logout,
  getUserById,
} from './actionCreators';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('loadRestaurants', () => {
  const dispatch = jest.fn();
  test('should dispatch LOAD_RESTAURANTS', async () => {
    axios.mockResolvedValue({ data: [{ _id: 1, name: 'restaurant' }] });

    await loadRestaurants()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_RESTAURANTS,
      restaurants: [{ _id: 1, name: 'restaurant' }],
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await loadRestaurants()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_RESTAURANTS_ERROR,
    });
  });
});

describe('loadSelectedRestaurants', () => {
  const dispatch = jest.fn();
  test('should dispatch SELECTED_RESTAURANTS', () => {
    loadSelectedRestaurants()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('getRestaurantById', () => {
  const dispatch = jest.fn();
  test('Should dispatch LOAD_RESTAURANT', async () => {
    axios.mockResolvedValue({ data: { _id: 1, name: 'restaurant' } });

    await getRestaurantById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_RESTAURANT,
      restaurant: { _id: 1, name: 'restaurant' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await getRestaurantById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_RESTAURANT_ERROR,
    });
  });
});

describe('loadBookings', () => {
  const dispatch = jest.fn();
  test('should dispatch LOAD_BOOKINGS', async () => {
    axios.mockResolvedValue({ data: [{ _id: 1, date: '01-01-2021' }] });

    await loadBookings()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_BOOKINGS,
      bookings: [{ _id: 1, date: '01-01-2021' }],
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await loadBookings()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_BOOKINGS_ERROR,
    });
  });
});

describe('getBookingById', () => {
  const dispatch = jest.fn();
  test('should dispatch LOAD_BOOKING', async () => {
    axios.mockResolvedValue({ data: [{ _id: 1, date: '01-01-2020' }] });

    await getBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_BOOKING,
      booking: [{ _id: 1, date: '01-01-2020' }],
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await getBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_BOOKING_ERROR,
    });
  });
});

describe('createBooking', () => {
  const dispatch = jest.fn();
  test('Should dispatch ADD_BOOKING', async () => {
    axios.post.mockResolvedValue({ data: { pax: 1, date: '01/01/2022' } });

    await createBooking()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_BOOKING,
      booking: { pax: 1, date: '01/01/2022' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await createBooking()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_BOOKING_ERROR,
    });
  });
});

describe('updateBookingById', () => {
  const dispatch = jest.fn();
  test('Should dispatch UPDATE_BOOKING', async () => {
    axios.put.mockResolvedValue({ data: { pax: 1, date: '01/01/2022' } });

    await updateBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_BOOKING,
      booking: { pax: 1, date: '01/01/2022' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await updateBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.UPDATE_BOOKING_ERROR,
    });
  });
});

describe('deleteBookingById', () => {
  const dispatch = jest.fn();
  test('Should dispatch DELETE_BOOKING', async () => {
    axios.delete.mockResolvedValue();

    await deleteBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_BOOKING,
    });
  });

  test('Should dispatch error', async () => {
    axios.delete.mockRejectedValue();

    await deleteBookingById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_BOOKING_ERROR,
    });
  });
});

describe('loadFavorites', () => {
  const dispatch = jest.fn();
  test('should dispatch LOAD_FAVORITES', async () => {
    axios.mockResolvedValue({ data: [{ _id: 1, name: 'restaurant' }] });

    await loadFavorites()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_FAVORITES,
      favorites: [{ _id: 1, name: 'restaurant' }],
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await loadFavorites()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_FAVORITES_ERROR,
    });
  });
});

describe('getFavoriteById', () => {
  const dispatch = jest.fn();
  test('Should dispatch LOAD_FAVORITE', async () => {
    axios.mockResolvedValue({ data: { _id: 1, name: 'restaurant' } });

    await getFavoriteById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_FAVORITE,
      favorite: { _id: 1, name: 'restaurant' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await getFavoriteById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_FAVORITE_ERROR,
    });
  });
});

describe('createFavorite', () => {
  const dispatch = jest.fn();
  test('Should dispatch ADD_FAVORITE', async () => {
    axios.post.mockResolvedValue({ data: { id: 1, restaurant: 1 } });

    await createFavorite()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_FAVORITE,
      favorite: { id: 1, restaurant: 1 },
    });
  });

  test('Should dispatch error', async () => {
    axios.post.mockRejectedValue();

    await createFavorite()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_FAVORITE_ERROR,
    });
  });
});

describe('deleteFavoriteById', () => {
  const dispatch = jest.fn();
  test('Should dispatch DELETE_FAVORITE', async () => {
    axios.delete.mockResolvedValue();

    await deleteFavoriteById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_FAVORITE,
    });
  });

  test('Should dispatch error', async () => {
    axios.delete.mockRejectedValue();

    await deleteFavoriteById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_FAVORITE_ERROR,
    });
  });
});

describe('signupUser', () => {
  const dispatch = jest.fn();
  test('Should dispatch SIGNUP_USER', async () => {
    axios.post.mockResolvedValue({ data: { email: 'user@user.com', name: 'user' } });

    await signupUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.SIGNUP_USER,
      user: { email: 'user@user.com', name: 'user' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await signupUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.SIGNUP_USER_ERROR,
    });
  });
});

describe('loginUser', () => {
  const dispatch = jest.fn();
  test('Should dispatch LOGIN_USER', async () => {
    axios.post.mockResolvedValue({ data: { email: 'user@user.com', username: 'user' } });

    await loginUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOGIN_USER,
      user: { email: 'user@user.com', username: 'user' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await loginUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOGIN_USER_ERROR,
    });
  });
});

describe('logout', () => {
  const setLogout = jest.fn();
  test('Should call setLogout function', async () => {
    axios.get.mockResolvedValue();
    await logout()(setLogout);

    expect(setLogout).toHaveBeenCalled();
  });

  test('Should get error', async () => {
    axios.mockRejectedValue();

    await logout();

    expect(setLogout).toHaveBeenCalled();
  });
});

describe('getUserById', () => {
  const dispatch = jest.fn();
  test('Should dispatch LOAD_USER', async () => {
    axios.mockResolvedValue({ data: { _id: 1, name: 'user' } });

    await getUserById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_USER,
      user: { _id: 1, name: 'user' },
    });
  });

  test('Should dispatch error', async () => {
    axios.mockRejectedValue();

    await getUserById()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_USER_ERROR,
    });
  });
});
