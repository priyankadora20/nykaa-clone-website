const express = require("express");
const UserModel = require("../Models/User.model");
const userRouter = express.Router();
require('dotenv').config()
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

    const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
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
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
});

userRouter.get("/logout", async (req, res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  return res.status(200).json({
    success: true,
    message: "Logged Out"
  })
})
module.exports = { userRouter };
