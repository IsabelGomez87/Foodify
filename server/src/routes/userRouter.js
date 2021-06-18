const { Router } = require('express');
const usersController = require('../controllers/usersController')();

function usersRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(usersController.getAllUsers);

  routes
    .route('/:userId')
    .get(usersController.getUserById)
    .put(usersController.updateUserById)
    .delete(usersController.deleteUserById);

  return routes;
}

module.exports = usersRouter();
