import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { signupUser, loginUser } from '../../redux/actions/actionCreators';
import CustomButton from '../common/buttons/CustomButton';
import './login.scss';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const newUser = useSelector((store) => store.newUser);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [saveUsername, setSaveUsername] = useState('');
  const [saveEmail, setSaveEmail] = useState('');
  const [savePassword, setSavePassword] = useState('');
  const [saveEmailLogin, setSaveEmailLogin] = useState('');
  const [savePasswordLogin, setSavePasswordLogin] = useState('');
  const [getModal, setGetModal] = useState(false);
  const signupUrl = '/landing/signup';

  const createUserData = () => {
    const newDataUser = {
      username: saveUsername,
      email: saveEmail,
      password: savePassword,
    };
    dispatch(signupUser(newDataUser));
    setGetModal(true);
  };

  const getLoginUser = () => {
    const newLoginUser = {
      email: saveEmailLogin,
      password: savePasswordLogin,
    };
    dispatch(loginUser(newLoginUser));
    setGetModal(true);
  };

  return (
    <>
      <div className="container-title">
        <CustomButton className="save-button go-back" dataIconSpan="akar-icons:arrow-left" secondClassSpan="back" handleClick={history.goBack} />
        <p className="list-title">my account</p>
      </div>
      {(location.pathname === signupUrl) ? (
        <>
          <form className="form-container">
            <p>Please, fill in this form to create an account</p>
            <label htmlFor="text" data-testId="input-username">
              <input type="text" name="username" className="input-username" placeholder="Username" required value={saveUsername} onChange={(event) => setSaveUsername(event.target.value)} />
            </label>
            <label htmlFor="email" data-testId="input-email">
              <input type="email" name="email" className="input-email" placeholder="Email" required value={saveEmail} onChange={(event) => setSaveEmail(event.target.value)} />
            </label>
            <label htmlFor="password" data-testId="input-password">
              <input type="password" name="password" className="input-password" placeholder="Password" required value={savePassword} onChange={(event) => setSavePassword(event.target.value)} />
            </label>
            <CustomButton data-testId="button-register" className=" register" text="register" handleClick={() => createUserData()} />
          </form>
          {newUser.signupError ? (
            <div className={getModal ? 'form__comments form__comments--visible' : 'form__comments form__comments--hidden'}>
              <div className="modal-container">
                <p>This user already exists</p>
                <br />
                <CustomButton className="container-confirm__link" route="landing/signup" text="Try again" handleClick={() => setGetModal(false)} />
              </div>
            </div>
          ) : (
            <div className={getModal ? 'form__comments form__comments--visible' : 'form__comments form__comments--hidden'}>
              <div className="modal-container">
                <p>Your account is correctly created !</p>
                <br />
                <CustomButton className="container-confirm__link" route="landing/login" text="Go to Login" handleClick={() => setGetModal(false)} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <form className="form-container">
            <p>Please, fill in this form to login</p>
            <label htmlFor="email" data-testId="input-email-login">
              <input type="email" name="email" className="input-email" placeholder="Email" required onChange={(event) => setSaveEmailLogin(event.target.value)} />
            </label>
            <label htmlFor="password" data-testId="input-password-login">
              <input type="password" name="password" className="input-password" placeholder="Password" required onChange={(event) => setSavePasswordLogin(event.target.value)} />
            </label>
            <CustomButton data-testId="button-login" className="register" text="login" handleClick={() => getLoginUser()} />
          </form>
          {user.loginError ? (
            <div className={getModal ? 'form__comments form__comments--visible' : 'form__comments form__comments--hidden'}>
              <div className="modal-container">
                <p>Your username or password are incorrect</p>
                <br />
                <CustomButton className="container-confirm__link" route="landing/login" text="Try again" handleClick={() => setGetModal(false)} />
              </div>
            </div>
          ) : (
            <div className={getModal ? 'form__comments form__comments--visible' : 'form__comments form__comments--hidden'}>
              <div className="modal-container">
                <p>{`Welcome ${user.user?.username.toUpperCase()}!`}</p>
                <br />
                <Link className="container-confirm__link" to="/">Go Home</Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default (Login);
