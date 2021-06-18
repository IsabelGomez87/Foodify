import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../../common/user';
import { getBookingById, deleteBookingById } from '../../redux/actions/actionCreators';
import BookingsList from '../BookingsList';
import './changeBooking.scss';

const BookingDetails = () => {
  const booking = useSelector((store) => store.booking);
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const { userToken } = getUser;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const token = userToken();
    dispatch(getBookingById(bookingId, token));
  }, []);

  const handleCancel = (visible) => {
    setIsVisible(visible);
  };

  const handleConfirm = (visible) => {
    const token = userToken();
    dispatch(deleteBookingById(bookingId, token));
    setIsVisible(visible);
  };

  return (
    <>
      <BookingsList />
      {booking && (
        <div className={isVisible ? 'edit-booking edit-booking--visible' : 'edit-booking'}>
          <div className="modal-booking">
            <div className="modal-booking__info">
              <div className="container-confirm" data-testId="popupinfo-container">
                <p className="card-info__name">
                  <Link to={`/restaurants/${booking.restaurant?._id}`}>
                    {booking.restaurant?.name}
                  </Link>
                </p>
                <p className="card-info__question">Do you want to cancel this date?</p>
                <div className="container-button">
                  <Link to="/bookings" data-testId="ok-button" className="container-button__confirm" type="button" onClick={() => handleConfirm(false)}>
                    <span className="iconify confirm" data-icon="bi:check-circle-fill" data-inline="false" />
                  </Link>
                  <button data-testId="close-button" className="container-button__cancel" type="button" onClick={() => handleCancel(false)}>
                    <span className="iconify cancel" data-icon="ion:close-circle" data-inline="false" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default (BookingDetails);
