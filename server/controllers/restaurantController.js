const { restaurantModel } = require("../model/restaurantModel");
const bcrypt = require('bcrypt');

// Add Restaurant
const addRestaurant = async (req, res) => {
  const { name, description, location, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newRestaurant = new restaurantModel({
    name,
    description,
    location,
    email,
    password: hashedPassword,
  });

  await newRestaurant.save();
  res.status(201).json({ message: 'Restaurant created successfully' });
};

// List all restaurants
const listAllRestaurants = async (req, res) => {
  try {
    const restaurantlist = await restaurantModel.find();
    res.status(200).json({ restaurants: restaurantlist });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "internal server error" });
  }
};

// Restaurant details by ID
const restaurantDetails = async (req, res) => {
  try {
    const { resId } = req.params;
    const resDetails = await restaurantModel.findById({ _id: resId });

    if (!resDetails) {
      return res.status(500).json({ error: "Restaurant not found" });
    }
    return res.status(200).json(resDetails);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "internal server error" });
  }
};

// Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { resId } = req.params;
    const { name, description, location } = req.body;

    let isResExist = await restaurantModel.findById(resId);

    if (!isResExist) {
      return res.status(400).json({ error: "Restaurant does not exist" });
    }

    const updatedRes = await restaurantModel.findByIdAndUpdate(resId, { name, description, location }, { new: true });

    res.status(200).json({ message: "Restaurant updated", updatedRes });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "internal server error" });
  }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { resId } = req.params;
    const deleteRes = await restaurantModel.findByIdAndDelete(resId);

    if (!deleteRes) {
      return res.status(400).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "internal server error" });
  }
};

// Get Menu for a Restaurant
const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantName } = req.params;
    if (!restaurantName) return res.status(400).json({ error: 'Restaurant name is required' });

    // Fetch restaurant with the menu
    const restaurant = await restaurantModel.findOne({ name: restaurantName }).populate('menu'); // Assuming 'menu' is populated as a reference
    if (!restaurant || !restaurant.menu) return res.status(404).json({ error: 'Menu not found for this restaurant' });

    res.status(200).json({ menu: restaurant.menu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "internal server error" });
  }
};

module.exports = {
  addRestaurant,
  listAllRestaurants,
  restaurantDetails,
  updateRestaurant,
  deleteRestaurant,
  getMenuByRestaurant, // Export the new method
};
