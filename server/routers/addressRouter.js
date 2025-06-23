const express = require("express");
const addressRouter = express.Router();
const authentication = require("../middlewares/authentication");
const AddressController = require("../controllers/addressController");

addressRouter.get("/address", authentication, AddressController.getUserAddress);
addressRouter.post("/address", authentication, AddressController.createAddress);
addressRouter.put("/address/:id", authentication, AddressController.updateAddress);
addressRouter.delete(
  "/address/:id",
  authentication,
  AddressController.deleteAddress
);

module.exports = addressRouter;
