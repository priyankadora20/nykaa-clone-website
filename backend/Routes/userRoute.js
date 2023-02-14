const express = require("express");
const UserModel = require("../Models/User.model");
const userRouter = express.Router();

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
    const token = UserModel.getJWTToken()
    //calling via method inside model. 
    
    res.status(201).json({
      success: true,
     token,
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
});
module.exports = { userRouter };