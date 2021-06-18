const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

function bookingsController() {
  async function getAllBookings(req, res) {
    const bookings = await Booking.find({}).sort({ _id: -1 }).populate('restaurant');
    res.status(200);
    res.json(bookings);
  }

  async function createOneBooking(req, res) {
    const { booking, userId } = req.body;
    const newBooking = new Booking(booking).populate('restaurant');
    try {
      await newBooking.save();
      await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } }, { new: true });
      res.status(200);
      res.json(newBooking);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function getBookingById(req, res) {
    const { bookingId } = req.params;
    try {
      const bookingById = await Booking.findById(bookingId).populate('restaurant');
      res.status(200);
      res.json(bookingById);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function updateBookingById(req, res) {
    const { bookingId } = req.params;
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId,
        { ...req.body },
        { new: true });
      res.status(200);
      res.json(updatedBooking);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function deleteBookingById(req, res) {
    const { bookingId } = req.params;
    try {
      const deleteBooking = await Booking.findByIdAndDelete(bookingId);
      res.status(200);
      res.json(deleteBooking);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    getAllBookings,
    createOneBooking,
    getBookingById,
    updateBookingById,
    deleteBookingById,
  };
}

module.exports = bookingsController;
