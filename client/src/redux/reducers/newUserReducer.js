import actionTypes from '../actions/actionTypes';

const newUserReducer = (user = {}, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_USER:
      return action.user;
    case actionTypes.SIGNUP_USER_ERROR:
      return { signupError: 'Signup incorrect' };
    default:
      return user;
  }
};

export default newUserReducer;
