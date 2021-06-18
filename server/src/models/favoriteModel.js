const { model, Schema } = require('mongoose');

const favoriteSchema = Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  isActive: { type: Boolean, default: true },
});

module.exports = model('Favorite', favoriteSchema);
