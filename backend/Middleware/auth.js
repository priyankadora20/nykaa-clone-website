const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model")
require('dotenv').config()
exports.isAuthenticatedUser =  async (req,res, next)=>{
    const {token} = req.cookies;
    console.log(req.cookies)
  if(!token){
    return res.status(401).json({msg: "Please Login to access this resources"})
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)
  
 req.user = await UserModel.findById(decodedData.id)
 
 next()
}

exports.authorizeRoles = (...roles)=>{
   return (req, res, next)=>{
    console.log(req.user)
    if(!roles.includes(req.user.role)) return res.status(403).json({msg: "User role not allowed"})
   return next()
   }
}