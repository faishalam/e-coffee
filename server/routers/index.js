const express = require("express");
const userRouter = require("./userRouter");
const addressRouter = require("./addressRouter");

const router = express.Router();

router.use("/", userRouter);
router.use("/", addressRouter);

module.exports = router;
