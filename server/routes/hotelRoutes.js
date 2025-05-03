const { addRestaurant, listAllRestaurants, restaurantDetails, updateRestaurant, deleteRestaurant, getMenuByRestaurant } = require('../controllers/restaurantController')
const authAdmin = require('../middlewares/authAdmin')

const hotelRouter = require('express').Router()




hotelRouter.get("/listhotels",listAllRestaurants) 
hotelRouter.post("/hoteldetails/:resId",restaurantDetails) 
hotelRouter.put("/updatehotel/:resId",updateRestaurant)
hotelRouter.delete("/deletehotel/:resId",deleteRestaurant)
hotelRouter.get('/menu/:restaurantName', getMenuByRestaurant);


module.exports = hotelRouter;