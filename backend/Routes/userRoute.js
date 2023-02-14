const express = require("express");
const UserModel = require("../Models/User.model");
const userRouter = express.Router();
const userml = require("../Models/User.model");
userRouter.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await UserModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "this is a sample id",
        url: "profilePicUrl",
      },
    });
    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ msg: "Please enter Email and Password" });
  }
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Please enter correct email and password" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ msg: "Enter correct email and password" });
    }

    const token = user.getJWTToken();

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
});
module.exports = { userRouter };
