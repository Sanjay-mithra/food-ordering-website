const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['burger', 'pure veg', 'shawarma', 'pizza', 'biriyani','parotta','falooda','mojito','icecream'],
    default: 'Other',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurants',
    required: true,
  }
}, { timestamps: true });

const foodModel = mongoose.model('foods', foodSchema);

module.exports = { foodModel };
