import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  getRestaurantById, createFavorite, getUserById, deleteFavoriteById,
} from '../../redux/actions/actionCreators';
import { getUser, isLogged } from '../../common/user';
import dolar from '../../assets/price-level';
import openHours from '../../assets/open-hours';
import CustomButton from '../common/buttons/CustomButton';
import GetBooking from '../GetBooking';
import './restaurantDetail.scss';

const RestaurantDetail = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId, userToken } = getUser;
  const [toFavorite, setToFavorite] = useState(false);
  const { restaurantId } = useParams();
  const [showBookingInfo, setShowBookingInfo] = useState(false);
  const id = userId();
  const token = userToken();

  const handleChange = () => {
    setShowBookingInfo(true);
  };

  const checkInFavorite = () => {
    const restaurantIncludedInUserFavorites = user.favorites?.find(
      (item) => item.restaurant._id === restaurantId,
    );
    if (restaurantIncludedInUserFavorites) setToFavorite(true);
  };

  useEffect(() => {
    dispatch(getUserById(id, token));
    dispatch(getRestaurantById(restaurantId));
    checkInFavorite();
  }, []);

  const saveInFavorite = () => {
    setToFavorite(true);
    const newFavorite = {
      restaurant: restaurantId,
    };
    dispatch(createFavorite(newFavorite, token, id));
  };

  const deleteToFavorite = () => {
    setToFavorite(false);
    const getFavoriteId = user.favorites.find((item) => item.restaurant._id === restaurantId);
    dispatch(deleteFavoriteById(getFavoriteId?._id, token));
  };

  return (restaurant ? (
    <section className="detail-container">
      <div className="detail-container__img">
        {isLogged() && (
          <button data-testId="favorite-button" className="save-button fav" type="button" onClick={toFavorite ? deleteToFavorite : saveInFavorite}>
            {toFavorite ? (
              <img
                className="heart--included"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEE0lEQVRoge2ZX2hbdRTHP+eXdtJ1rL3pRidj+iR1gjJwozgVrGNMTEo70TR1UgaKysAHfVGYSBER+yCDaWXTIWI7u0Udk/7RIn3ZRHF2wpi6oj4IE6rb2tS5bsz13uNDd9OkTbPk3rS3g3yeTn459/y+Xw73l5tzoUSJEiVKBIDkm3j+y0RdyLabFdkqsBZYB5QD48AZheNGOWI1xk/lUy/Zn9jgqD4m6APAeiAMXAPOCvypKl/bRo+ujsR/LYqRif6ejbZjOkT04XwKgn4jYnZbkZZjWQ309jykIm8A9+dVDYZCmJero7GTufLmNaLD+8uTo9V7EN2VK2/+/Xl/8rJ5cV0sdgXgbCJRsaLC2avCMwXWcuu9a1XWviQNDVPZErIKnOg7aDmEPgcaPGyavv93BiciZeViTzkDQL2vajBkrt3yuLV9+8Ts7+YY0eH95cm/qgbxbSLFt6ACcl8xiikMhStrH5ndGTM7MTlavYfimQDYXCwTAAJbxi+dezvL+gwT/T0bHZUTs9eXIGowm9IPgIyO2I7pYOmbABDFeStjwQ0u9H5ypxFzZvE1eccW6tzfmVRHjDHNwUnyRgia3DhlRJQtwcjxjqhsdeOUEQduD0aOd1T1Njee6QjcGowcHwhr3TD91FoWgBS/lLtBupGLAQjxhar848bpRkYD0OILEU1pnjEi/BKIGj8oP7thyoiq/BCMGu+IkNKcdmrpYDByvGOr85Ubp4yEo/GfYKZVNwGnVzU+OeJ+yHhoFOWDxdfjDSFTa4aRq8v+O6Aq5xZXkifOT9kVH6UvZBhZs61tEpP5eLwkUV5f3dT0b/rSnH+I4eVr3gF+XDRRhXPKWlG7b/biHCPS0DCFmJ3A5KLIKoxLwFPZJilzjACEI7HTAm1Mj2GWCqoiT18/XeeQ1QiAFY0fQelYOF0F82ZNpCUx35fzGgGwrphXgYNFl1QoSpc1PPJarpScRiQWs63hkTZBPyyusvwR5YB1cmSntLc7OfPyKabt7Sa5qa4TleeLIy9PVDqtaOwFEbnhvVrQ6Ge879CzQCdQ5lVbntigu8PR1rzv0YJnWGN9h7cJ2gNYhV6bJxcRdoQj8b5CLsp5j2SjJtoyGFK7Pv0RulgIeiJkm3sLNQEejABUNe74rXp57WbQV5h+OeOXKZCO6suhB6uaYr97KeB7PHqhv6deVLoE7vBY4g/QtnC09bgfHZ46ks6qSOv3V7Vyg6rsLfhipcu2K+7xawKKPLBO9h5uRnSfQu0NNv0b4TkrEv+iWHv77kg6VmPLUcFeD9o9X44gn5UZc3cxTUzXXSCSvYfaVHgPqLy+NCnKLqsx/vFC7Leg70LGBhJ3ieN8CqDGPFHzaOzmGzm5jA10rxwb6F4ZtI4Si83/1Wsvc1RcoQ4AAAAASUVORK5CYII="
                alt="heart--included"
              />
            ) : (
              <img
                className="heart"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAD3klEQVRoge2ZTWgcZRjHf8+bxCBCobmIFPUktUKloBI6HxvXUiJ4MIiehBz8ChYverGgeBARcxChflBsD2IUwY9SQcQguexspmuNQqlaUQ+CElFBtNoYmM37eEhmnf1KdncmOyns7/TsO8887//PMzP7zjswYMCAAQNyQDpNLJfLe1V1CjgsInuAa4ER4A/gAhCo6inf9891Um9xcfGAqt4DeMA+YAyIgJ+An0XkU2vtad/3v8vESLlcvhWYBe7opCBQFpGnXNcttToYBMHtIvIc4HZSTFUXgCd93/9is7y2RpaWlkZWV1dfAo5sltdufuB1Y8zjjuP8CxCG4ZXW2mPAQ13Wiuu9EkXRE8VisdoqoaXAIAh2i8gHQLGHSZOcUdW7hoaGxFr7MTCeppiqLlSr1XuLxeKfjceajGx0Yp70JuLJQxER4GBG9Raq1eqdjZ0xjYkbl1MmJgBExCEjExv1Dg0PD7/YNJ78sXFjn20c34Goqt6WfAA0dmSWnW8CQETkhbqBOAjD8EZr7YX+a+odVd0b/8/UOmKtncpPUm+IyN1xnLy0DuWgJS2H46BmRESuz0dLKq6Lg5oRVb0mHy2p2BMHyUvrihyEpGUkDpJGLuYgJC1
        /xUHSyC85CElLTXPSyDc5CEnL13GQvNk/z0dLKmqaa0aMMfP5aOkdY8wntTgOXNf9ikSrLgPOO47zbfyjbtGoqif6r6c3RKROa52RlZWVk8BvfVXUG7+r6hvJgTojk5OTl4C65fEO5VnP8/5ODjS9IUZR9LKIfNk/TV1zLoqi442DLV+iwjDcb609A1y17bK64x8RObjxYKqjqSMAjuOcB6ZZ34bZKSjwYCsT0MYIgOd5p1h/9d0RqOrznue92+54WyMAy8vLTwNvZ66qS0RkzvO8ZzbN2aqIqpowDE+o6gPZSeuKk67rzoiI3Sxp044AiIh1HOdhoOlJ0QdedV33ka1MQAdGYN2M53mPquoM0HLvNWPWVPWo53mPiUhHD5yu97DCMJy01r4D7O5aXmdcVNX7fd//qJuTOupIEsdx5tfW1sZJLKGzQlXPGmNu6dYE9GAEYGJi4vsoihxVPcr6x5m0VEVkdmxszHcc54deCqTeHg2CYNwYM6eqN/RY4kdg2vO8II2OnjqSxPf9z0ZHRw+o6rFuzxWROeDmtCYg4w3rUqk0ZYw5Dly9ReqvIjLjuu6HWc2duiNJCoXCaVXdB7zVLkdV37fW7s/SBGzjJ4QgCKZF5DX+X0FfUtUjvu+/uR3zbeu3kFKpdJMx5j0Aa+19hULhctxyWqdSqeyqVCq78tYxoN/8B300TX+oY0UiAAAAAElFTkSuQmCC"
                alt="heart"
              />
            )}
          </button>
        )}
        <img className="img" src={restaurant.img} alt="img" />
      </div>
      {showBookingInfo ? <GetBooking /> : (
        <div className="detail-container__info">
          <ul className="restaurant-container__card">
            <CustomButton className="save-button go-back" dataIconSpan="akar-icons:arrow-left" secondClassSpan="back" handleClick={history.goBack} />
            <div className="card-info">
              <li className="card-info__name">{restaurant.name?.toUpperCase()}</li>
              <div className="card-rating">
                <li className="card-rating__rate">
                  <span className="iconify star" data-icon="twemoji:star" data-inline="false" />
                  {`${restaurant.rating} / 5`}
                </li>
                <li className="card-rating__reviews">
                  {`(${restaurant.user_ratings_total} reviews)`}
                </li>
                <li className="card-rating__price-level">{dolar[restaurant.price_level]}</li>
              </div>
              <div className="card-contact">
                <li className="card-contact__web">
                  <a className="website" target="_blank" href={restaurant.website} rel="noreferrer">
                    <span className="iconify web" data-icon="mdi:search-web" data-inline="false" />
                    Web page
                  </a>
                </li>
                <li className="card-contact__phone">
                  <span className="iconify phone" data-icon="entypo:phone" data-inline="false" />
                  {restaurant.phone_number}
                </li>
              </div>
              <div className="card-extraInfo">
                <li className="card-extraInfo__hours">
                  {restaurant.opening_hours ? `Today's schedule:  ${(restaurant.opening_hours.weekday_text.find(
                    (item) => item.includes(openHours[dayjs().day()]),
                  ).split(': ').pop())}`
                    : 'No schedule available'}
                </li>
              </div>
              <li className="card-extraInfo__address">
                <span className="iconify address" data-icon="fa-solid:map-marker-alt" data-inline="false" />
                {restaurant.address}
              </li>
              <CustomButton className="custom-button booking" text="booking" handleClick={handleChange} />
            </div>
          </ul>
        </div>
      )}
    </section>
  )
    : (<h3>No restaurant available</h3>)
  );
};

export default RestaurantDetail;
