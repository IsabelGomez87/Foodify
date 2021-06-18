import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { getUser, isLogged } from '../../common/user';
import { getUserById } from '../../redux/actions/actionCreators';
import CustomButton from '../common/buttons/CustomButton';
import List from '../List';
import './bookingsList.scss';

const BookingsList = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userToken, userId } = getUser;

  if (!isLogged()) {
    return <Redirect to="/landing" />;
  }

  useEffect(() => {
    const id = userId();
    const token = userToken();
    dispatch(getUserById(id, token));
  }, []);

  return (
    <section>
      <div className="container-title">
        <CustomButton className="save-button go-back" dataIconSpan="akar-icons:arrow-left" secondClassSpan="back" handleClick={history.goBack} />
        <p className="list-title">my bookings</p>
      </div>
      {user.bookings?.length ? (
        <List data={user.bookings} typeOfInfo="booking" />
      ) : (
        <p className="error-message">{'You don\'t have any bookings'}</p>
      )}
    </section>
  );
};

export default (BookingsList);
