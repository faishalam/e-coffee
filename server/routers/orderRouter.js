const express = require("express");
const orderRouter = express.Router();
const authentication = require("../middlewares/authentication");
const OrderController = require("../controllers/orderController");

orderRouter.get("/order", authentication, OrderController.getOrders);

module.exports = orderRouter;
