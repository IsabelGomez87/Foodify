const {
  getAllFavorites,
  createOneFavorite,
  getFavoriteById,
  updateFavoriteById,
  deleteFavoriteById,
} = require('./favoritesController')();
const Favorite = require('../models/favoriteModel');

jest.mock('../models/favoriteModel');

describe('Given a favoritesController', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };

  describe('When call to getAllFavorites function', () => {
    test('should get all favorites', async () => {
      Favorite.find.mockImplementationOnce(() => ({
        sort: jest.fn().mockImplementationOnce(() => ({
          populate: jest.fn().mockImplementationOnce(() => ([{}])),
        })),
      }));
      await getAllFavorites(null, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When call to createOneFavorite function', () => {
    test('should create a favorite', async () => {
      const req = {
        body: null,
      };

      await createOneFavorite(req, res);
      expect(res.json).toHaveBeenCalled();
    });

    test('should get an error', async () => {
      const req = {
        body: null,
      };

      Favorite.mockImplementationOnce(() => ({
        save: jest.fn().mockRejectedValueOnce('error'),
      }));

      await createOneFavorite(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call getFavoriteById function', () => {
    const req = {
      params: {
        favoriteId: 1,
      },
    };
    test('should get a favorite by id', async () => {
      Favorite.findById.mockResolvedValue([{}]);

      await getFavoriteById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      Favorite.findById.mockRejectedValue();

      await getFavoriteById(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('When call updateFavoriteById function', () => {
    const req = {
      params: {
        favoriteId: 1,
      },
      body: {
        isActive: false,
      },
      new: true,
    };

    test('should update one favorite by id', async () => {
      Favorite.findByIdAndUpdate.mockResolvedValue([{}]);

      await updateFavoriteById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      Favorite.findByIdAndUpdate.mockRejectedValue('error');

      await updateFavoriteById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call deleteFavoriteById function', () => {
    const req = {
      params: {
        favorited: 1,
      },
    };
    test('should get delete one favorite by id', async () => {
      Favorite.findByIdAndDelete.mockResolvedValue(1);

      await deleteFavoriteById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });

    test('should get an error', async () => {
      Favorite.findByIdAndDelete.mockRejectedValue('error');

      await deleteFavoriteById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });
});
