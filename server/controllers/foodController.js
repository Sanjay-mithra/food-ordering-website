const mongoose = require("mongoose");
const { foodModel } = require("../model/foodModel");
const uploadToCloudinary = require("../utilities/imageUpload");
const { restaurantModel } = require("../model/restaurantModel");

// Create Food
const createFood = async (req, res) => {
    try {
      const { name, description, price, category, restaurant } = req.body;
  
      if (!name || !description || !price || !category || !restaurant) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: "Image not found" });
      }
  
      const existingRestaurant = await restaurantModel.findById(restaurant);
      if (!existingRestaurant) {
        return res.status(400).json({ message: "Restaurant not found" });
      }
  
      const imageUrl = await uploadToCloudinary(req.file.path);
  
      if (!imageUrl) {
        return res.status(500).json({ message: "Image upload failed" });
      }
  
      const newFood = new foodModel({
        name,
        description,
        price,
        image: imageUrl,
        category,
        restaurant,
      });
  
      const savedFood = await newFood.save();
      return res.status(201).json({ message: "Food added", savedFood });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };
  

  
// List All Foods (no filter)
const listAllFoods = async (req, res) => {
  try {
    const foodlist = await foodModel.find();
    res.status(200).json({ foods: foodlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Get Foods By Restaurant
const getFoodsByRestaurant = async (req, res) => {
    const { id } = req.params;
  
    try {
      let foods;
  
      if (!id || id === '') {
        foods = await foodModel.find(); // Corrected to foodModel.find
      } else {
        foods = await foodModel.find({ restaurant: id }); // Corrected to foodModel.find
      }
  
      res.status(200).json({ success: true, foods });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
// Get Food Details
const foodDetails = async (req, res) => {
  try {
    const { foodId } = req.params;
    const foodDetail = await foodModel.findById(foodId).populate("restaurant");

    if (!foodDetail) {
      return res.status(404).json({ error: "Food not found" });
    }

    return res.status(200).json(foodDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Update Food
const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { name, description, price, category, restaurant } = req.body;

    const isFoodExist = await foodModel.findById(foodId);
    if (!isFoodExist) {
      return res.status(404).json({ error: "Food not found" });
    }

    let imageUrl = isFoodExist.image;

    if (req.file) {
      const cloudinaryRes = await uploadToCloudinary(req.file.path);
      imageUrl = cloudinaryRes.secure_url; // Make sure to extract the URL properly
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        name,
        description,
        price,
        category,
        image: imageUrl,
        restaurant,
      },
      { new: true }
    );

    res.status(200).json({ message: "Food updated", updatedFood });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// Delete Food
const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const deleted = await foodModel.findByIdAndDelete(foodId);

    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  createFood,
  listAllFoods,
  getFoodsByRestaurant,
  foodDetails,
  updateFood,
  deleteFood,
};
