/* eslint-disable react/require-default-props */
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import dayjs from 'dayjs';
import transformToDolar from '../../assets/price-level';
import CustomButton from '../common/buttons/CustomButton';
import './list.scss';

const List = ({ data, typeOfInfo }) => {
  const todayDate = dayjs().format('DD/MM/YYYY');

  return (data?.length ? (
    <section className="restaurant-container" data-testId="restaurant-container">
      {data.length && data.map((element) => (
        <ul key={element._id} className={(element.date < todayDate) ? 'restaurant-container__card restaurant-container__card--hidden' : 'restaurant-container__card'}>
          {(typeOfInfo === 'restaurant') && (
          <>
            <li key={element.img} className="card-img">
              <Link to={`/restaurants/${element._id}`}>
                <img className="img" src={element.img} alt="img" />
              </Link>
            </li>
            <div className="card-info">
              <li key={element.name} className="card-info__name">
                <Link to={`/restaurants/${element._id}`}>
                  {element.name}
                </Link>
              </li>
              <li key={element.price_level} className="card-info__price-level">{transformToDolar[element.price_level]}</li>
              <div className="card-rating">
                <li key={element.rate} className="card-rating__rate">
                  <span className="iconify star" data-icon="twemoji:star" data-inline="false" />
                  {`${element.rating} / 5`}
                </li>
                <li key={element.user_ratings_total} className="card-rating__reviews">{`(${element.user_ratings_total} reviews)`}</li>
              </div>
              <div className="buttons-container">
                <CustomButton
                  className="custom-button details"
                  route="restaurants"
                  elementId={element._id}
                  text="View details"
                />
              </div>
            </div>
          </>
          )}
          {(typeOfInfo === 'favorite') && (
          <>
            <li key={element.restaurant.img} className="card-img">
              <Link to={`/restaurants/${element.restaurant._id}`}>
                <img className="img" src={element.restaurant.img} alt="img" />
              </Link>
            </li>
            <div className="card-info">
              <li key={element.restaurant.name} className="card-info__name">
                <Link to={`/restaurants/${element.restaurant._id}`}>
                  {element.restaurant.name}
                </Link>
              </li>
              <li key={element.restaurant.price_level} className="card-info__price-level">{transformToDolar[element.restaurant.price_level]}</li>
              <div className="card-rating">
                <li key={element.restaurant.rating} className="card-rating__rate">
                  <span className="iconify star" data-icon="twemoji:star" data-inline="false" />
                  {`${element.restaurant.rating} / 5`}
                </li>
                <li key={element.restaurant.user_ratings_total} className="card-rating__reviews">{`(${element.restaurant.user_ratings_total} reviews)`}</li>
              </div>
              <div className="buttons-container">
                <CustomButton
                  className="custom-button details"
                  route="restaurants"
                  elementId={element.restaurant._id}
                  text="View details"
                />
              </div>
            </div>
          </>
          )}
          {(typeOfInfo === 'booking') && (
          <>
            <li key={element.restaurant.img} className="card-img">
              <Link to={`/restaurants/${element.restaurant._id}`}>
                <img className="img" src={element.restaurant.img} alt="img" />
              </Link>
            </li>
            <div className="card-info">
              <li key={element.restaurant.name} className="card-info__name">
                <Link to={`/restaurants/${element.restaurant._id}`}>
                  {element.restaurant.name}
                </Link>
              </li>
              <li key={element.pax} className="card-info__pax">{`${element.pax} pax`}</li>
              <li key={element.date} className="card-info__date">{element.date}</li>
              <li key={element.time} className="card-info__time">{element.time}</li>
              <CustomButton
                className={(element.date < todayDate) ? 'save-button disabled' : 'save-button changeBooking'}
                dataIconSpan="ic:round-free-cancellation"
                secondClassSpan="cancel"
                route={(element.date >= todayDate) && 'bookings'}
                elementId={element._id}
              />
            </div>
          </>
          )}
        </ul>
      ))}
    </section>
  ) : (<p>No data available</p>)
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  typeOfInfo: PropTypes.string,
};

export default List;
