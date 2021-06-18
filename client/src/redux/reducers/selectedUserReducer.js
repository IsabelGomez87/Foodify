import actionTypes from '../actions/actionTypes';

const selectedUserReducer = (user = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return action.user;
    case actionTypes.LOGIN_USER_ERROR:
      return { loginError: 'Login incorrect' };
    case actionTypes.LOAD_USER:
      return action.user;
    case actionTypes.UPDATE_USER:
      return { ...user, ...action.user };
    default:
      return user;
  }
};

export default selectedUserReducer;
