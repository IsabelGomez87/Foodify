import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomButton from '../common/buttons/CustomButton';
import logo from '../../assets/logo_small.png';
import { logout } from '../../redux/actions/actionCreators';
import { isLogged, setLogout } from '../../common/user';

const Header = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (visible) => {
    setIsVisible(visible);
  };

  const handleLogout = (visible) => {
    setIsVisible(visible);
    dispatch(logout(setLogout));
  };

  return (
    <nav className="header-container__nav" data-testId="container__nav">
      <CustomButton data-testId="button__nav" className="nav__button" handleClick={() => handleClick(true)} dataIconSpan="mdi:hamburger" secondClassSpan="menu-icon" />
      <section className={isVisible ? 'background-menu background-menu--visible' : 'background-menu'} />
      <section className={isVisible ? 'menu-container menu-container--visible' : 'menu-container'}>
        <nav className="menu-container__nav" data-testId="container__menu">
          <CustomButton className="save-button close" dataIconSpan="eva:close-fill" secondClassSpan="close" handleClick={() => handleClick(false)} />
          <Link className="nav__item" to="/" onClick={() => handleClick(false)}>
            <span className="iconify home" data-icon="bx:bxs-home-circle" data-inline="false" />
            Home
          </Link>
          {isLogged() ? (
            <>
              <Link className="nav__item" to="/" onClick={() => handleLogout(false)}>
                <span className="iconify login" data-icon="bx:bxs-user-circle" data-inline="false" />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="nav__item" to="/landing" onClick={() => handleClick(false)}>
                <span className="iconify login" data-icon="bx:bxs-user-circle" data-inline="false" />
                Login
              </Link>
            </>
          )}
          <div className="nav__line" />
          <Link className="nav__item" to="/favorites" onClick={() => handleClick(false)}>
            <span className="iconify heart" data-icon="ic:round-favorite" data-inline="false" />
            My favorites
          </Link>
          <Link className="nav__item" to="/bookings" onClick={() => handleClick(false)}>
            <span className="iconify bell" data-icon="fa-solid:concierge-bell" data-inline="false" />
            My bookings
          </Link>
        </nav>
      </section>
      <Link className="nav__element" to="/">
        <img className="img-logo" src={logo} alt="Foodify" />
      </Link>
    </nav>
  );
};

export default (Header);
