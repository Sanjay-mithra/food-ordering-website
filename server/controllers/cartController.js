const { cartModel } = require("../model/cartModel");
const { foodModel } = require("../model/foodModel");


const addToCart = async (req, res) => {
    try {
      const { quantity } = req.body;
      const { foodId } = req.params;
      const userId = req.user;
  
      const parsedQuantity = parseInt(quantity, 10);
  
      if (isNaN(parsedQuantity)) {
        return res.status(400).json({ message: "Quantity must be a number" });
      }
  
      if (!foodId) {
        return res.status(400).json({ message: "Food item not found" });
      }
  
      const food = await foodModel.findById(foodId);
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
  
      let cart = await cartModel.findOne({ userId });
  
      if (!cart) {
        cart = new cartModel({ userId, foods: [] });
      }
  
      const existingItem = cart.foods.find(item => item.foodId.equals(foodId));
  
      if (existingItem) {
       return res.status(400).json({error:"Item already in Cart"})
      } else {
        cart.foods.push({
          foodId,
          quantity: parsedQuantity,
          price: food.price,
        });
      }

      cart.calculateTotalPrice()

      await cart.save();
  
      return res.status(200).json({ message: "Cart updated successfully", cart });
  
    } catch (error) {
      console.error("Add to cart error:", error);
      return res.status(500).json({
        message: "Something went wrong while adding to cart",
        error: error.message,
      });
    }
  };



  const getCart = async (req, res) => {
    try {
      const userId = req.user;
  
      const cartItems = await cartModel.findOne({ userId }).populate("foods.foodId");
  
      if (!cartItems) {
        return res.status(200).json({ foods: [] }); // send empty array
      }
  
      return res.status(200).json({
        foods: cartItems.foods,
        totalPrice: cartItems.totalPrice
      });
  
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({ error: error.message || "Failed to fetch cart" });
    }
  };
  

const removeFromCart = async (req, res) => {
    try {
      const userId = req.user;
      const { foodId } = req.params;
  
      if (!foodId) {
        return res.status(400).json({ message: "food ID is required" });
      }
  

      let cart = await cartModel.findOne({userId})

      if(!cart){
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.foods = cart.foods.filter((item)=> !item.foodId.equals(foodId))
      await cart.save()

      res.status(200).json({ message: "Food removed from cart",cart });

    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "failed to remove item from cart ",
      });
    }
  };

  const clearCart = async (req, res) => {
    try {
      const userId = req.user;
  
      const cart = await cartModel.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      cart.foods = [];
      await cart.save(); // Save the modified cart directly
  
      return res.status(200).json({ message: "Cart cleared" });
  
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
        error: error.message || "Failed to clear items from cart",
      });
    }
  };
  
  


module.exports={
    getCart,
    addToCart,
    removeFromCart,
    clearCart
}