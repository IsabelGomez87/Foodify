const {
  getAllBookings,
  createOneBooking,
  getBookingById,
  updateBookingById,
  deleteBookingById,
} = require('./bookingsController')();

const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

jest.mock('../models/bookingModel');
jest.mock('../models/userModel');

describe('Given a bookingsController', () => {
  describe('When call to getAllBookings function', () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };
    test('should get all bookings', async () => {
      Booking.find.mockImplementationOnce(() => ({
        sort: jest.fn().mockImplementationOnce(() => ({
          populate: jest.fn().mockImplementationOnce(() => ([{}])),
        })),
      }));

      await getAllBookings(null, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When call to createOneBooking function', () => {
    const req = {
      body: { booking: { pax: 1 }, userId: '1234' },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    test('should create a booking', async () => {
      class BookingMock {
        constructor(name) {
          this.name = name;
        }

        // eslint-disable-next-line class-methods-use-this
        save() {}

        // eslint-disable-next-line class-methods-use-this
        populate() {}
      }

      const newBooking = new BookingMock('New Booking in the batcave');

      Booking.mockReturnValueOnce(newBooking);
      User.findByIdAndUpdate.mockImplementationOnce(() => {});

      await createOneBooking(req, res);
      expect(res.json).toHaveBeenCalledWith([{}]);
    });

    test('Then an error should be send', async () => {
      Booking.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce('error'),
        populate: jest.fn().mockRejectedValueOnce('error'),
      });
      await createOneBooking(req, res);
      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call getBookingById function', () => {
    const req = {
      params: {
        bookingId: 1,
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    test('should get a booking by id', async () => {
      Booking.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({})),
      }));
      await getBookingById(req, res);

      expect(res.json).toHaveBeenCalledWith({});
    });

    test('should get an error', async () => {
      Booking.findById.mockRejectedValue();

      await getBookingById(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('When call updateBookingById function', () => {
    const req = {
      params: {
        bookingId: 1,
      },
      body: {
        pax: '2',
      },
      new: true,
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    test('should update one booking by id', async () => {
      Booking.findByIdAndUpdate.mockResolvedValue([{}]);

      await updateBookingById(req, res);

      expect(res.json).toHaveBeenCalledWith([{}]);
    });
    test('should get an error', async () => {
      Booking.findByIdAndUpdate.mockRejectedValue('error');

      await updateBookingById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });

  describe('When call deleteBookingById function', () => {
    const req = {
      params: {
        bookingd: 1,
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };
    test('should get delete one booking by id', async () => {
      Booking.findByIdAndDelete.mockResolvedValue(1);

      await deleteBookingById(req, res);

      expect(res.json).toHaveBeenCalledWith(1);
    });

    test('should get an error', async () => {
      Booking.findByIdAndDelete.mockRejectedValue('error');

      await deleteBookingById(req, res);

      expect(res.send).toHaveBeenCalledWith('error');
    });
  });
});
