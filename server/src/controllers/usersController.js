const Favorite = require('../models/favoriteModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

function userController() {
  async function getAllUsers(req, res) {
    const users = await User.find({});
    res.status(200);
    res.json(users);
  }

  async function getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('bookings', 'favorites');
      const bookingsIds = user.bookings && user.bookings.map((booking) => booking._id);
      const bookings = await Booking.find({ _id: { $in: bookingsIds } }).sort({ _id: -1 }).populate('restaurant');
      const favoritesIds = user.favorites && user.favorites.map((favorite) => favorite._id);
      const favorites = await Favorite.find({ _id: { $in: favoritesIds } }).sort({ _id: -1 }).populate('restaurant');
      user.bookings = bookings;
      user.favorites = favorites;
      res.json(user);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  async function updateUserById(req, res) {
    const { userId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(userId,
        { ...req.body },
        { new: true });
      res.json(
        updatedUser,
      );
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  async function deleteUserById(req, res) {
    const { userId } = req.params;
    try {
      const deleteUser = await User.findByIdAndDelete(userId);
      res.status(200);
      res.json(deleteUser);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
  };
}

module.exports = userController;
