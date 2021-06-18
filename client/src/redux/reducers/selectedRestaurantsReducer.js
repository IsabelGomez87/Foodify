import actionTypes from '../actions/actionTypes';

const selectedRestaurantsReducer = (selectedRestaurants = [], action) => {
  if (action.type === actionTypes.SELECTED_RESTAURANTS) {
    return action.selectedRestaurants;
  }
  return selectedRestaurants;
};

export default selectedRestaurantsReducer;
