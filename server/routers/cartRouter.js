const express = require("express");
const cartRouter = express.Router();
const authentication = require("../middlewares/authentication");
const CartController = require("../controllers/cartController");

cartRouter.get("/cart", authentication, CartController.getCart);
cartRouter.post("/cart", authentication, CartController.addToCart);
cartRouter.delete("/cart", authentication, CartController.clearCart);
cartRouter.put("/cart/:id", authentication, CartController.updateCartItem);
cartRouter.delete("/cart/:id", authentication, CartController.deleteCartItem);

module.exports = cartRouter;
