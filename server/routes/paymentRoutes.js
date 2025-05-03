
const { paymentFunction } = require('../controllers/paymentController');
const { authUser } = require('../middlewares/authUser')


const paymentRouter = require('express').Router()

paymentRouter.post("/makepayment",authUser,paymentFunction)



module.exports = {paymentRouter}