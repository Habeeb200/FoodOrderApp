const asyncHandler = require("express-async-handler")
const Product = require("../../models/Product")

const getAllProduct=asyncHandler(async(req,res)=>{
    const results = await Product.find()
    if(!results.length)return res.status(400).json("No products found")
    res.json(results)
})
const getAllProductCategory=asyncHandler(async(req,res)=>{
    const {category} = req.params
    if(category){
        const results = await Product.find({productcategory: category})
        if(!results.length) return res.status(400).json({message: `No product in ${category} category was found!`})
        return res.status(200).json(results)
    }
    const results = await Product.find()
    if(!results.length)return res.status(400).json("No products found")
    res.json(results)
})
const getAllProductName=asyncHandler(async(req,res)=>{
    const {name} = req.params
    if(name){
        const results = await Product.find({productname: name})
        if(!results.length) return res.status(400).json({message: `could not find ${name} product!`})
        return res.status(200).json(results)
    }
    const results = await Product.find()
    if(!results.length)return res.status(400).json("No products found")
    res.json(results)
})
const addProduct=asyncHandler(async(req,res)=>{
    const {image,name,category,price,quantity} = req.body
    if(!image || !name || !category || !price|| !quantity) return res.status(400).json({message: "All fields are required"})
    const result = await Product.create({
        productimage: image,
        productname: name,
        productprice: price,
        productcategory: category,
        quantity
    })
    res.status(200).json({message: "Product has been successfully added"})
})
const updateProduct=asyncHandler(async(req,res)=>{
    const {id,image,name,category,price,quantity} = req.body
    if(!id) return res.status(400).json({message: "Product Id required"})
    const findProduct  = await Product.findOne({_id: id}).exec()
    if(!findProduct) return res.status(400).json({message: "Product not found"})
    if(image) findProduct.productimage = image
    if(name) findProduct.productname = name
    if(category) findProduct.productcategory = category
    if(price) findProduct.productprice = price
    if(quantity) findProduct.quantity = quantity
    const result = await findProduct.save()
    res.status(200).json({message: "Product has been succcessfully updated"})
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) return res.status(400).json({message: "Id required"})
    const findProduct = await Product.findOne({_id: id}).exec()
    if(!findProduct) res.status(400).json({message: "Could not find product"})
    const result = await findProduct.deleteOne()
    res.status(200).json({message: "Product deleted successfully"})
})
module.exports = {getAllProduct,getAllProductCategory,getAllProductName,addProduct,updateProduct,deleteProduct}