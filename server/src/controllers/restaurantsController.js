const Restaurant = require('../models/restaurantModel');

function restaurantsController() {
  async function getAllRestaurants(req, res) {
    const restaurants = await Restaurant.find({}).sort({ rating: -1 });
    res.status(200);
    res.json(restaurants);
  }

  async function createOneRestaurant(req, res) {
    const newRestaurant = new Restaurant(req.body);
    try {
      await newRestaurant.save();
      res.status(200);
      res.json(newRestaurant);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function getRestaurantById(req, res) {
    const { restaurantId } = req.params;
    try {
      const restaurantById = await Restaurant.findById(restaurantId);
      res.status(200);
      res.json(restaurantById);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function updateRestaurantById(req, res) {
    const { restaurantId } = req.params;
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId,
        { ...req.body },
        { new: true });
      res.status(200);
      res.json(updatedRestaurant);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function deleteRestaurantById(req, res) {
    const { restaurantId } = req.params;
    try {
      const deleteRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
      res.status(200);
      res.json(deleteRestaurant);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    getAllRestaurants,
    createOneRestaurant,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById,
  };
}

module.exports = restaurantsController;
