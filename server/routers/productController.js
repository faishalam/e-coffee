const express = require("express");
const productRouter = express.Router();
const authentication = require("../middlewares/authentication");
const ProductController = require("../controllers/productController");

productRouter.post("/product", authentication, ProductController.createProduct);
productRouter.get("/product", authentication, ProductController.getProducts);
productRouter.get(
  "/product/:id",
  authentication,
  ProductController.getProductById
);
productRouter.put(
  "/product/:id",
  authentication,
  ProductController.updateProduct
);
productRouter.delete(
  "/product/:id",
  authentication,
  ProductController.deleteProduct
);

module.exports = productRouter;
