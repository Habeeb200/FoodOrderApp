const User  = require("../../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const {Order,ProductOrdered}  = require("../../models/Orders")
const Product = require("../../models/Product")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
//Users can login,signup,logout,make an order,delete order if it is till pending,update and order if it is pending,see rider details,see all previous pickup and their status
const loginUser = asyncHandler(async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password) res.status(400).json({message: "All fields required"})
    const findUser = await User.findOne({username}).exec()
    if(!findUser)return res.status(400).json({message: "User not found"})
    const match = await bcrypt.compare(password,findUser.password)
    if(!match)return res.status(400).json("Password is incorrect")
    const access_token = jwt.sign(
        {id: findUser._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    findUser.active = true
    const result = await findUser.save()
    res.status(200).json(access_token)
})

const createUser = asyncHandler(async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password) return res.status(400).json({message: "All fields required"})
    const duplicate = await User.findOne({username}).lean().exec()  
    if(duplicate) return res.status(400).json({message: "Username already exists"})
    const hashedPassword =await bcrypt.hash(password,10)
    const createUser = await User.create({
        username,
        password: hashedPassword,
    })
    res.status(200).json({message: "User created successfully"})
})

const createOrder = asyncHandler(async(req,res)=>{
    const id = req.userId
    const {orders,amount} = req.body
    if(!id || !orders || !amount) return res.status(400).json({message: "All fields required"})
    // Validate user ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    //check if user exist
    const userExist = await User.findOne({_id: id}).exec()
    if(!userExist) return res.status(400).json({message: "User does not exist"})
    let allproduct = []
    await Promise.all(orders.map(async (order) => {
        const productExist = await Product.findOne({ productname: order.name }).exec();
        if (!productExist) return res.status(400).json({ message: "Product not found" });
        // Create new product and push it to the array
        const newProduct = await ProductOrdered.create({
            productimage: productExist.productimage,
            productname: order.name,
            amount: productExist.productprice,
            quantity: order.quantity
        });
        allproduct.push(newProduct);
    }));
    const newOrder = await Order.create({
        user,
        products:allproduct
    })
    res.json(newOrder)
})

const deleteOrder = asyncHandler(async(req,res)=>{
    const id = req.userId
    if(!id) res.status(400).json({message: "Id required"})
    const findOrder = await Order.findOne({user: id}).exec()
    if(!findOrder) res.status(400).json({message: "Order does not exist"})
    if(findOrder.status !== "Pending")return res.status(400).json({message: "Cannot delete an order that is not pending"})
    const result = await findOrder.deleteOne()
    res.json({message: "Order deleted successfully"})
})

const updateOrder = asyncHandler(async(req,res)=>{
    const id = req.userId
    const {orderid,productid,quantity} = req.body
    if(!orderid || !productid) return res.status(400).json({message: "All fields required"})
    const orderExist = await Orders.findOne({_id: orderid}).exec()
    if(!orderExist) return res.status(400).json({message: "Order does not exist"})
    //check if user exist
    const userExist = await User.findOne({_id: id}).lean().exec()
    if(!userExist) return res.status(400).json({message:"User does not exist"})
    if(orderExist.status != "Pending")return res.status(400).json({message: "Cannot update an order that is pending"})
    //check if product exist
    const productExist = orderExist.products.find((product)=> product._id == productid)
    if(!productExist) return res.status(400).json({message:"Product does not exist"})
    if(quantity){
        productExist.quantity = quantity
    }
    const result = await orderExist.save()
    res.json({message:"Order updated successfully"})
})

const fetchMyOrders = asyncHandler(async(req,res)=>{
    const id = req.userId
    if(!id) return res.status(400).json("Id required")
    const findOrders = await Order.find({user: id}).exec()
    if(!findOrders.length) return res.status(400).json({message: "No orders found"})
    res.json(findOrders)
})

module.exports = {loginUser,createUser,createOrder,deleteOrder,updateOrder,fetchMyOrders}