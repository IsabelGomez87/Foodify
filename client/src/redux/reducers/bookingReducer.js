import actionTypes from '../actions/actionTypes';

const bookingReducer = (bookings = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKINGS:
      return action.bookings;
    case actionTypes.ADD_BOOKING:
      return [...bookings, action.booking];
    case actionTypes.DELETE_BOOKING:
      return bookings.filter((item) => item._id !== action.bookingId);
    default:
      return bookings;
  }
};

export default bookingReducer;
