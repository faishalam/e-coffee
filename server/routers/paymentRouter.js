const express = require("express");
const paymentRouter = express.Router();
const authentication = require("../middlewares/authentication");
const PaymentController = require("../controllers/paymentController");

paymentRouter.post(
  "/payment/:id",
  authentication,
  PaymentController.getPaymentToken
);

paymentRouter.post(
  "/midtrans-notification",
  PaymentController.handleNotification
);

module.exports = paymentRouter;
