const { logout, updateProfile, getDashboardStats, listAllUsers, getAdminProfile } = require('../controllers/adminController')
const { addRestaurant } = require('../controllers/restaurantController')
const { login } = require('../controllers/sharedLogin')
const authAdmin = require('../middlewares/authAdmin')

const adminRouter =require('express').Router()

adminRouter.post("/login",login)
adminRouter.patch("/updateadmin",authAdmin,updateProfile)
adminRouter.post("/logout",authAdmin,logout)
adminRouter.get("/listallusers",authAdmin,listAllUsers)
adminRouter.get("/dashboard", authAdmin, getDashboardStats); 
adminRouter.post("/addrestaurant",authAdmin,addRestaurant)
adminRouter.get('/profile', authAdmin, getAdminProfile);


module.exports={
    adminRouter
}

