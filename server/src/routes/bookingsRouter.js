const { Router } = require('express');
const bookingsController = require('../controllers/bookingsController')();

function bookingsRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(bookingsController.getAllBookings)
    .post(bookingsController.createOneBooking);

  routes
    .route('/:bookingId')
    .get(bookingsController.getBookingById)
    .put(bookingsController.updateBookingById)
    .delete(bookingsController.deleteBookingById);

  return routes;
}

module.exports = bookingsRouter();
