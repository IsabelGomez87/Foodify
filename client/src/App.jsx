import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import FavoritesList from './components/FavoritesList';
import BookingsList from './components/BookingsList';
import ChangeBooking from './components/ChangeBooking';
import RestaurantDetail from './components/RestaurantDetail';
import Footer from './components/Footer';
import store from './redux/store/store';
import './App.scss';

function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <header className="header-container">
          <Header />
        </header>
        <main className="main-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/landing/signup" component={Login} />
            <Route path="/landing/login" component={Login} />
            <Route path="/landing" component={Landing} />
            <Route path="/favorites" component={FavoritesList} />
            <Route path="/bookings/:bookingId" component={ChangeBooking} />
            <Route path="/bookings" component={BookingsList} />
            <Route path="/restaurants/:restaurantId" component={RestaurantDetail} />
          </Switch>
        </main>
        <footer className="footer-container">
          <Footer />
        </footer>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
