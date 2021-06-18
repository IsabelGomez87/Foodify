const { Router } = require('express');
const restaurantsController = require('../controllers/restaurantsController')();

function restaurantsRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(restaurantsController.getAllRestaurants)
    .post(restaurantsController.createOneRestaurant);

  routes
    .route('/:restaurantId')
    .get(restaurantsController.getRestaurantById)
    .put(restaurantsController.updateRestaurantById)
    .delete(restaurantsController.deleteRestaurantById);

  return routes;
}

module.exports = restaurantsRouter();
