const { signup, login, logout, profile, updateProfile, listAllSellers } = require('../controllers/sellerController')
const authAdmin = require('../middlewares/authAdmin')
const { authSeller } = require('../middlewares/authSeller')





const sellerRouter = require('express').Router()

sellerRouter.post("/signup",authAdmin,signup)
sellerRouter.post("/login",login)
sellerRouter.post("/logout",authSeller,logout)
sellerRouter.get("/profile",authSeller,profile)
sellerRouter.get("/listallsellers",authAdmin,listAllSellers)
sellerRouter.patch("/updateseller",authSeller,updateProfile)

module.exports={sellerRouter}