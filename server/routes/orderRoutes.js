const express = require('express');
const orderRouter = require('express').Router()
const { authUser } = require('../middlewares/authUser');
const { getUserOrders, placeOrder } = require('../controllers/orderController');

orderRouter.get('/myorders',authUser, getUserOrders);
orderRouter.post('/addorder',authUser,placeOrder );

module.exports = { orderRouter};