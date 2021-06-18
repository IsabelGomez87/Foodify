import React, {
  useState,
  useCallback,
  memo,
} from 'react';
import { useSelector } from 'react-redux';
import {
  GoogleMap, Marker, useJsApiLoader, InfoWindow,
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import './map.scss';
import styles from './App.styles';

const Map = () => {
  const [zoom, setZoom] = useState(12);
  const [, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const selectedRestaurants = useSelector((store) => store.selectedRestaurants);
  const restaurants = useSelector((store) => store.restaurants);

  const dataToPrint = () => {
    if (selectedRestaurants.length === 0) {
      return restaurants;
    }
    return selectedRestaurants;
  };
  dataToPrint();

  const center = {
    lat: 41.38361422576639,
    lng: 2.157799371665292,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={styles.containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        <>
          <div className="slidecontainer">
            <input
              type="range"
              min="10"
              max="20"
              value={zoom}
              onChange={(event) => setZoom(+event.target.value)}
              style={styles.sliderStyles}
            />
          </div>
          {dataToPrint().map((restaurant) => (
            <Marker
              key={restaurant._id}
              position={{ lat: restaurant.location.lat, lng: restaurant.location.lng }}
              icon="logo_small_icon_only.svg"
              onClick={() => {
                setSelected(restaurant);
              }}
            />
          ))}
          {selected ? (

            <InfoWindow
              position={{ lat: selected.location.lat, lng: selected.location.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <Link to={`/restaurants/${selected._id}`}>
                <div className="infoWindow-container">
                  <img className="infoWindow-container__image" src={selected.img} alt="restaurant" width="150px" height="70px" />
                  <p className="infoWindow-container__name">{selected.name}</p>
                  <p className="infoWindow-container__address">{selected.address}</p>
                </div>
              </Link>
            </InfoWindow>
          ) : null}

        </>
      </GoogleMap>
    </>
  ) : <></>;
};

export default memo(Map);
