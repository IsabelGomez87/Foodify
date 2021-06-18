const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  place_id: String,
  name: String,
  price_level: String,
  address: String,
  opening_hours: {
    open_now: Boolean,
    periods: [{
      close: {
        day: Number,
        time: String,
      },
      open: {
        day: Number,
        time: String,
      },
    }],
    weekday_text: [String],
  },
  phone_number: String,
  website: String,
  img: String,
  rating: Number,
  reviews: [{
    author_name: String,
    profile_photo_url: String,
    language: String,
    rating: Number,
    relative_time_description: String,
    text: String,
    time: Number,
  }],
  user_ratings_total: Number,
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
