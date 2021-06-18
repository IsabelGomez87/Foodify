const { model, Schema } = require('mongoose');

const bookingSchema = Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  pax: Number,
  date: String,
  time: String,
  comments: String,
  isActive: { type: Boolean, default: true },
});

module.exports = model('Booking', bookingSchema);
