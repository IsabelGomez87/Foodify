import actionTypes from '../actions/actionTypes';

const selectedFavoriteReducer = (favorite = {}, action) => {
  if (action.type === actionTypes.LOAD_FAVORITE) {
    return action.favorite;
  }
  return favorite;
};

export default selectedFavoriteReducer;
