const User  = require("../../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const Orders = require("../../models/Orders")
const mongoose = require("mongoose")
//Users can login,signup,logout,make an order,delete order if it is till pending,update and order if it is pending,see rider details,see all previous pickup and their status
const loginUser = asyncHandler(async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password) res.status(400).json({message: "All fields required"})
    const findUser = await User.findOne({username}).exec()
    if(!findUser)return res.status(400).json({message: "User not found"})
    const match = await bcrypt.compare(password,findUser.password)
    if(!match)return res.status(400).json("Password is incorrect")
    findUser.active = true
    const result = await findUser.save()
    res.status(200).json("User logged in successfully")
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
    const {user,productname,amount} = req.body
    if(!user || !productname || !amount) return res.status(400).json({message: "All fields required"})
    // Validate user ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    //check if user exist
    const userExist = await User.findOne({_id: user}).exec()
    if(!userExist) return res.status(400).json({message: "User does not exist"})
    if(userExist.active == false) return res.status(400).json({message: "You have to be logged in"})
    const newOrder = await Orders.create({
        user,
        productname,
        amount
    })
    res.json(newOrder)
})

const deleteOrder = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) res.status(400).json({message: "Id required"})
    const findOrder = await Orders.findOne({user: id}).exec()
    console.log(findOrder);
    if(!findOrder) res.status(400).json({message: "Order does not exist"})
    if(findOrder.status !== "Pending")return res.status(400).json({message: "Cannot delete an order that is not pending"})
    const result = await findOrder.deleteOne()
    res.json({message: "Order deleted successfully"})
})
const updateOrder = asyncHandler(async(req,res)=>{
    const {id,user,productname} = req.body
    if(!id || !user || !productname) return res.status(400).json({message: "All fields required"})
    const orderExist = await Orders.findOne({_id: id}).exec()
    if(!orderExist) return res.status(400).json({message: "Order does not exist"})
    //check if user exist
    const userExist = await User.findOne({_id: user}).lean().exec()
    if(!userExist) return res.status(400).json({message:"User does not exist"})
    if(orderExist.status != "Pending")return res.status(400).json({message: "Cannot update an order that is pending"})
    orderExist.productname = productname
    const result = await orderExist.save()
    res.json({message:"Order updated successfully"})
})

const fetchMyOrders = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) return res.status(400).json("Id required")
    const findOrders = await Orders.find({user: id}).exec()
    if(!findOrders.length) return res.status(400).json({message: "No orders found"})
    res.json(findOrders)
})
module.exports = {loginUser,createUser,createOrder,deleteOrder,updateOrder,fetchMyOrders}