import React from 'react';
import { useHistory } from 'react-router-dom';
import { isLogged } from '../../common/user';
import CustomButton from '../common/buttons/CustomButton';
import './landing.scss';

const Landing = () => {
  const history = useHistory();

  return (
    <section className="landing-container">
      <div className="container-title">
        <CustomButton className="save-button go-back" dataIconSpan="akar-icons:arrow-left" secondClassSpan="back" handleClick={history.goBack} />
        <p className="list-title">my account</p>
      </div>
      <div className="container-buttons">
        {isLogged() ? (
          <>
            <CustomButton className="register" text="log out" route="/" />
          </>
        ) : (
          <>
            <CustomButton className="register" text="sign up" route="landing/signup" />
            <CustomButton className="register" text="login" route="landing/login" />
          </>
        )}
      </div>
    </section>
  );
};

export default (Landing);
