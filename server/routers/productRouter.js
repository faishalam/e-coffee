const express = require("express");
const productRouter = express.Router();
const authentication = require("../middlewares/authentication");
const ProductController = require("../controllers/productController");

// Product routes
productRouter.post("/product", authentication, ProductController.createProduct);
productRouter.get("/product", authentication, ProductController.getProducts);
productRouter.get("/product/:id", authentication, ProductController.getProductById);
productRouter.put("/product/:id", authentication, ProductController.updateProduct);
productRouter.delete("/product/:id", authentication, ProductController.deleteProduct);

// Product images routes
productRouter.post("/product/:id/images", authentication, ProductController.addProductImage);
productRouter.patch("/product/images/:id", authentication, ProductController.updateProductImage);
productRouter.delete("/product/images/:id", authentication, ProductController.deleteProductImage);

module.exports = productRouter;
