const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://static.vecteezy.com/ti/vecteur-libre/p1/17722096-cuisine-cuisine-logo-de-cuisine-restaurant-menu-cafe-creation-de-logo-d-etiquette-de-restaurant-illustrationle-gratuit-vectoriel.jpg'
  },
  email: { 
    type: String, 
    required: true,
     unique: true 
    },
  password: {
     type: String,
      required: true
     }
}, { timestamps: true });

const restaurantModel = new mongoose.model('Restaurants', restaurantSchema);

module.exports = {restaurantModel}
