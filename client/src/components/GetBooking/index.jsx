import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format, subDays } from 'date-fns';
import { getUser, isLogged } from '../../common/user';
import {
  getRestaurantById, createBooking,
} from '../../redux/actions/actionCreators';
import CustomButton from '../common/buttons/CustomButton';
import PopupInfo from '../PopupInfo';
import 'react-datepicker/dist/react-datepicker.css';
import './getBooking.scss';

const GetBooking = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = useParams();
  const [numberPax, setNumberPax] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [saveComments, setSaveComments] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { userId, userToken } = getUser;

  if (!isLogged()) {
    return <Redirect to="/landing" />;
  }

  useEffect(() => {
    dispatch(getRestaurantById(restaurantId));
  }, [restaurantId]);

  const handleClick = (visible) => {
    setIsVisible(visible);
  };

  const saveBookingDetails = () => {
    const id = userId();
    const token = userToken();
    const detailsBooking = {
      pax: numberPax,
      date: format(startDate, 'dd/MM/yyyy'),
      time: format(startTime, 'h:mm aa'),
      comments: saveComments,
      restaurant: restaurantId,
    };
    dispatch(createBooking(detailsBooking, token, id));
    setBookingConfirmed(true);
  };

  return (

    <div className="restaurant-container__card">
      <CustomButton className="save-button go-back" dataIconSpan="akar-icons:arrow-left" secondClassSpan="back" handleClick={history.goBack} />
      <div className="card-info booking-details">
        <p className="booking-details__name">
          {'Booking at '}
          <><br /></>
          {`${restaurant.name?.toUpperCase()}`}
        </p>
        {bookingConfirmed ? <PopupInfo />
          : (
            <form className="booking-details__form">
              <label htmlFor="pax">
                Pax
                <select
                  data-testId="label-pax"
                  className="form__pax"
                  name="pax"
                  type="number"
                  required
                  selected={numberPax}
                  onChange={(event) => setNumberPax(event.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </label>
              <div>
                Date
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={subDays(new Date(), 0)}
                  placeholderText="Select a present or future date"
                  dateFormat="dd/MM/yyyy"
                  className="form__date"
                  required
                />
              </div>
              <div>
                Time
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="form__time"
                  required
                />
              </div>
              <label htmlFor="comments" data-testId="label-comments">
                Comments
                <button className="button-comments" type="button" onClick={() => handleClick(true)}>Write your comments here</button>
                <div className={isVisible ? 'form__comments form__comments--visible' : 'form__comments'}>
                  <div className="modal-content">
                    <textarea
                      data-testId="textarea-comments"
                      name="comments"
                      type="text"
                      pattern="[a-zA-Z0-9-]+"
                      placeholder="Write your comments here..."
                      selected={saveComments}
                      onChange={(event) => setSaveComments(event.target.value)}
                      className="modal-content__textarea"
                    />
                    <div className="container-button">
                      <button data-testId="ok-button" className="container-button__confirm" type="button" onClick={() => handleClick(false)}>
                        <span className="iconify validate" data-icon="bi:check-circle-fill" data-inline="false" />
                      </button>
                      <button data-testId="close-button" className="container-button__cancel" type="button" onClick={() => handleClick(false)}>
                        <span className="iconify cancel" data-icon="ion:close-circle" data-inline="false" />
                      </button>
                    </div>
                  </div>
                </div>
              </label>
              <CustomButton className="custom-button confirm" text="confirm" handleClick={saveBookingDetails} />
            </form>
          )}
      </div>
    </div>
  );
};

export default GetBooking;
