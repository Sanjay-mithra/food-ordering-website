const { login } = require('../controllers/sharedLogin')
const { signup, profile, updateProfile, logout } = require('../controllers/userController')
const { authUser } = require('../middlewares/authUser')




const userRouter = require('express').Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.get("/profile",authUser,profile)
userRouter.get("/profile",authUser,profile)
userRouter.patch("/updateuser",authUser,updateProfile)

module.exports={userRouter}