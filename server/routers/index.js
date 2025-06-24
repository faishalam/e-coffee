const express = require("express");
const userRouter = require("./userRouter");
const addressRouter = require("./addressRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");

const router = express.Router();

router.use("/", userRouter);
router.use("/", addressRouter);
router.use("/", productRouter);
router.use("/", orderRouter);

module.exports = router;
