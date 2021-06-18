const { model, Schema } = require('mongoose');

const userSchema = Schema({
  email: String,
  password: String,
  username: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return password === this.password;
};

module.exports = model('User', userSchema);
