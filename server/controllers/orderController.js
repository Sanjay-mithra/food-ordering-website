const { orderModel } = require("../model/orderModel");
const { cartModel } = require("../model/cartModel");

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id || req.user;

    const orders = await orderModel.find({ user: userId }).populate('items.food');
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id || req.user;
    const { address } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart || cart.foods.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Debug log
    console.log("Order to save:", {
      user: userId,
      items: cart.foods,
      totalPrice: cart.totalPrice,
      deliveryAddress: address,
    });

    const newOrder = new orderModel({
      user: userId,
      items: cart.foods.map(item => ({
        food: item.foodId,
        quantity: item.quantity,
      })),
      totalPrice: cart.totalPrice,
      deliveryAddress: address,
    });

    await newOrder.save();

    // Clear cart after order
    cart.foods = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({ message: "Order placed", order: newOrder });

  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

module.exports = {
  getUserOrders,
  placeOrder
};
