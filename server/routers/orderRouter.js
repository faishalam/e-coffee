const express = require("express");
const orderRouter = express.Router();
const authentication = require("../middlewares/authentication");
const OrderController = require("../controllers/orderController");

orderRouter.post("/order", authentication, OrderController.createOrder);
orderRouter.get("/order", authentication, OrderController.getOrders);
orderRouter.get("/order/:id", authentication, OrderController.getOrderById);
orderRouter.put(
  "/order/:id",
  authentication,
  OrderController.updateOrderStatus
);

module.exports = orderRouter;
