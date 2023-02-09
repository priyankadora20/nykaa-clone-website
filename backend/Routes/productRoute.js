const express = require("express")
const {ProductModel} = require("../Models/Product.model")

const productRouter = express.Router()

productRouter.get("/", async(req, res)=>{
   const products = await ProductModel.find()
   res.send(products)
})
productRouter.post("/new", async (req, res)=>{
    console.log(req.body)
    const product = await ProductModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
} )
module.exports = { productRouter}