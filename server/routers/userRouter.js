const express = require("express");
const userRouter = express.Router();
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/userController");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/user", authentication, UserController.getProfile);
userRouter.put("/user", authentication, UserController.updateUser);
userRouter.get("/user/:id", authentication, UserController.getProfileById);

module.exports = userRouter;
