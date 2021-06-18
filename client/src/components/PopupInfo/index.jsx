import React from 'react';
import { Link } from 'react-router-dom';
import './popupInfo.scss';

const PopupInfo = () => (
  <div className="container-confirm" data-testId="popupinfo-container">
    <p>
      Congrats!
      <br />
      Your reservation has been successfully made
    </p>
    <Link className="container-confirm__link" to="/bookings">
      Show my bookings
    </Link>
  </div>

);

export default (PopupInfo);
