import actionTypes from '../actions/actionTypes';

const selectedRestaurantReducer = (restaurant = {}, action) => {
  if (action.type === actionTypes.LOAD_RESTAURANT) {
    return action.restaurant;
  }
  return restaurant;
};

export default selectedRestaurantReducer;
