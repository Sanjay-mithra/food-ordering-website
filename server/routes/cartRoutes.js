const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController')
const { authUser } = require('../middlewares/authUser')

const cartRouter = require('express').Router()

cartRouter.post("/addtocart/:foodId",authUser,addToCart)
cartRouter.get("/getcart",authUser,getCart)
cartRouter.delete("/removefromcart/:foodId",authUser,removeFromCart)
cartRouter.post("/clearcart",authUser,clearCart)


module.exports={cartRouter}