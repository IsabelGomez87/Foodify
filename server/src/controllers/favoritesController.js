const Favorite = require('../models/favoriteModel');
const User = require('../models/userModel');

function favoritesController() {
  async function getAllFavorites(req, res) {
    const favorites = await Favorite.find({}).sort({ _id: -1 }).populate('restaurant');
    res.status(200);
    res.json(favorites);
  }

  async function createOneFavorite(req, res) {
    const { favorite, userId } = req.body;
    const user = await User.findById(userId).populate('favorites');
    const isIncluded = user.favorites.find(
      (element) => element.restaurant.toString() === favorite.restaurant.toString(),
    );
    const newFavorite = new Favorite(favorite).populate('restaurant');

    try {
      if (!isIncluded) {
        await newFavorite.save();
        await User.findByIdAndUpdate(userId,
          { $push: { favorites: newFavorite._id } },
          { new: true });
        res.status(200);
        res.json(newFavorite);
      } else {
        res.send('Already in favorites');
      }
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function getFavoriteById(req, res) {
    const { favoriteId } = req.params;
    try {
      const favoriteById = await Favorite.findById(favoriteId).populate('restaurant');
      res.status(200);
      res.json(favoriteById);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function updateFavoriteById(req, res) {
    const { favoriteId } = req.params;
    try {
      const updatedFavorite = await Favorite.findByIdAndUpdate(favoriteId,
        { ...req.body },
        { new: true });
      res.status(200);
      res.json(updatedFavorite);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function deleteFavoriteById(req, res) {
    const { favoriteId } = req.params;
    try {
      const deleteFavorite = await Favorite.findByIdAndDelete(favoriteId);
      res.status(200);
      res.json(deleteFavorite);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    getAllFavorites,
    createOneFavorite,
    getFavoriteById,
    updateFavoriteById,
    deleteFavoriteById,
  };
}

module.exports = favoritesController;
