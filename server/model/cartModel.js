const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId ,
    ref:'users',
    required: true,
  },
  foods : [
    {
      foodId: {
        type: mongoose.Types.ObjectId ,
        ref:'foods',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  totalPrice :{
    type: Number,
    required: true,
    default: 0
  },

},{timestamps: true,});

cart.methods.calculateTotalPrice = function () {
  this.totalPrice = this.foods.reduce((total, food) => total + (food.price * food.quantity), 0);
};

const cartModel = new mongoose.model("Cart", cart);

module.exports = {cartModel}