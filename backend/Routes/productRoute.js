const express = require("express");
const { ProductModel } = require("../Models/Product.model");
const ErrorHandler = require("../Utils/errorhanler");
const catchAsyncErrors = require("../Middleware/catchAsyncError")
const productRouter = express.Router();

productRouter.get("/", catchAsyncErrors(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({
    success: true,
    products,
  });
}));

productRouter.get("/:id", catchAsyncErrors(async (req, res) => {
  const products = await ProductModel.findById(req.params.id);
  if (!products)
    return res.status(400).json({ success: false, err: "contact to admin" });
  res.status(200).json({
    success: true,
    products,
  });
}));
productRouter.post("/new", async (req, res) => {
 try{
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
 }catch(err){
 return res.status(401).json({success:false, message: err.message})
 }
 
});

productRouter.put("/edit/:id", async (req, res) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return res.send(500).json({
      success: false,
      message: "Product Not found",
    });
  }
  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product updated",
  });
});

productRouter.delete("/delete/:id", catchAsyncErrors(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product)
    return res
      .status(500)
      .json({ success: false, message: "Product not Found" });
  await ProductModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product Deleted Successflly",
  });
}));
module.exports = { productRouter };
