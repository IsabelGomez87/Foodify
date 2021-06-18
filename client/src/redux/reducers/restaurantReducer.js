import actionTypes from '../actions/actionTypes';

const restaurantReducer = (restaurants = [], action) => {
  if (action.type === actionTypes.LOAD_RESTAURANTS) {
    return action.restaurants;
  }
  return restaurants;
};

export default restaurantReducer;
