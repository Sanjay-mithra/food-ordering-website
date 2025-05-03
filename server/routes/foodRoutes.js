
const { listAllFoods, createFood, foodDetails, updateFood, deleteFood, getFoodsByRestaurant } = require('../controllers/foodController');
const authAdmin = require('../middlewares/authAdmin');
const { authSeller } = require('../middlewares/authSeller');
const upload = require('../middlewares/multer');
const foodRouter = require('express').Router()


foodRouter.post("/addfood", authSeller, upload.single('image'), createFood);
foodRouter.get("/listfoods", listAllFoods);
foodRouter.get("/fooddetails/:foodId", foodDetails); // changed from POST to GET
foodRouter.put("/updatefood/:foodId", authSeller, upload.single('image'), updateFood);
foodRouter.delete("/deletefood/:foodId", authSeller, deleteFood);
foodRouter.get('/restaurant/:id', getFoodsByRestaurant);

module.exports = foodRouter;
