const {
  getAllRestaurants,
  createOneRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
} = require('./restaurantsController')();
const Restaurant = require('../models/restaurantModel');

jest.mock('../models/restaurantModel');

describe('Given a restaurantsController', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };

  describe('When call to getAllRestaurants function', () => {
    test('should get all restaurants', async () => {
      Restaurant.find.mockImplementationOnce(() => ({
        sort: jest.fn().mockImplementationOnce(() => ([{}])),
      }));

      await getAllRestaurants(null, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When call to createOneRestaurant function', () => {
    test('should create a restaurant', async () => {
      const req = {
        body: null,
      };

      await createOneRestaurant(req, res);
      expect(res.json).toHaveBeenCalled();
    });

    test('should get an error', async () => {
      const req = {
        body: null,
      };

      Restaurant.mockImplementationOnce(() => ({
        save: jest.fn().mockRejectedValueOnce('error'),
      }));

      await createOneRestaurant(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call getRestaurantById function', () => {
    const req = {
      params: {
        restaurantId: 1,
      },
    };
    test('should get a restaurant by id', async () => {
      Restaurant.findById.mockResolvedValue([{}]);

      await getRestaurantById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      Restaurant.findById.mockRejectedValue();

      await getRestaurantById(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('When call updateRestaurantById function', () => {
    const req = {
      params: {
        restaurantId: 1,
      },
      body: {
        name: 'newResturantName',
      },
      new: true,
    };

    test('should update one restaurant by id', async () => {
      Restaurant.findByIdAndUpdate.mockResolvedValue([{}]);

      await updateRestaurantById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      Restaurant.findByIdAndUpdate.mockRejectedValue('error');

      await updateRestaurantById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call deleteRestaurantById function', () => {
    const req = {
      params: {
        restaurantId: 1,
      },
    };
    test('should get delete one restaurant by id', async () => {
      Restaurant.findByIdAndDelete.mockResolvedValue(1);

      await deleteRestaurantById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });

    test('should get an error', async () => {
      Restaurant.findByIdAndDelete.mockRejectedValue('error');

      await deleteRestaurantById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });
});
