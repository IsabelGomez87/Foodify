/* eslint-disable class-methods-use-this */
const {
  getAllUsers, getUserById, updateUserById, deleteUserById,
} = require('./usersController')();
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('Given a usersController', () => {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };

  describe('When call to getAllUsers function', () => {
    test('should get all users', async () => {
      User.find.mockResolvedValue([{}]);

      await getAllUsers(null, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When call getUserById function', () => {
    const req = {
      params: {
        userId: 1,
      },
    };
    test('should get a user by id', async () => {
      User.findById.mockResolvedValue([{}]);

      await getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      User.findById.mockRejectedValue();

      await getUserById(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('When call updateUserById function', () => {
    const req = {
      params: {
        userId: 1,
      },
      body: {
        firstname: 'userfirstname',
      },
      new: true,
    };

    test('should update one user by id', async () => {
      User.findByIdAndUpdate.mockResolvedValue([{}]);

      await updateUserById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      User.findByIdAndUpdate.mockRejectedValue('error');

      await updateUserById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call deleteUserById function', () => {
    const req = {
      params: {
        userId: 1,
      },
    };
    test('should get delete one user by id', async () => {
      User.findByIdAndDelete.mockResolvedValue(1);

      await deleteUserById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });

    test('should get an error', async () => {
      User.findByIdAndDelete.mockRejectedValue('error');

      await deleteUserById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });
});
