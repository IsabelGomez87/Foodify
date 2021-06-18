import actionTypes from '../actions/actionTypes';

const selectedBookingReducer = (booking = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKING:
      return action.booking;
    case actionTypes.UPDATE_BOOKING:
      return { ...booking, ...action.booking };
    default:
      return booking;
  }
};

export default selectedBookingReducer;
