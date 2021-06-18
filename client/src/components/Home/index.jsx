import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRestaurants, loadSelectedRestaurants } from '../../redux/actions/actionCreators';
import List from '../List';
import Map from '../Map';
import './home.scss';

const Home = () => {
  const restaurants = useSelector((store) => store.restaurants);
  const selectedRestaurants = useSelector((store) => store.selectedRestaurants);
  const dispatch = useDispatch();
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    dispatch(loadRestaurants());
    dispatch(loadSelectedRestaurants([]));
  }, []);

  useEffect(() => {
    if (restaurantName === '') dispatch(loadSelectedRestaurants([]));
  }, [restaurantName]);

  const getName = (event) => {
    setRestaurantName(event.target.value);
    const restaurantToPrint = restaurants.filter(
      (item) => item.name.toLowerCase().includes(restaurantName),
    );
    dispatch(loadSelectedRestaurants(restaurantToPrint));
  };

  return (
    <div className="home-container">
      <label htmlFor="hero-name" className="label-search">
        <input
          className="label-search__input"
          value={restaurantName}
          onChange={getName}
          placeholder="Search your restaurant"
        />
      </label>
      <Map />
      <p className="list-title">- restaurants -</p>
      <List data={selectedRestaurants.length === 0 ? restaurants : selectedRestaurants} typeOfInfo="restaurant" />
    </div>
  );
};

export default (Home);
