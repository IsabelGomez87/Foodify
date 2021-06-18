import actionTypes from '../actions/actionTypes';

const favoriteReducer = (favorites = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_FAVORITES:
      return action.favorites;
    case actionTypes.ADD_FAVORITE:
      return [...favorites, action.favorite];
    case actionTypes.DELETE_FAVORITE:
      return favorites.filter((item) => item._id !== action.favoriteId);
    default:
      return favorites;
  }
};

export default favoriteReducer;
