const { Router } = require('express');
const favoritesController = require('../controllers/favoritesController')();

function favoritesRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(favoritesController.getAllFavorites)
    .post(favoritesController.createOneFavorite);

  routes
    .route('/:favoriteId')
    .get(favoritesController.getFavoriteById)
    .put(favoritesController.updateFavoriteById)
    .delete(favoritesController.deleteFavoriteById);

  return routes;
}

module.exports = favoritesRouter();
