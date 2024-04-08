const Rider = require("../../models/Rider")
const User = require("../../models/User")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Order = require("../../models/Orders")


//Admin can get all orders and users can not get all orders
const getAllUserOrder=asyncHandler(async(req,res)=>{
    const orders = await Order.find()
    if(!orders.length) return res.status(400).json({message: "No orders found"})
    res.json(orders)
})
//Admin and users can create an order
const createUserOrder = asyncHandler(async(req,res)=>{
    const {user,rider,productname,amount} = req.body
    if(!user || !productname || !amount) return res.status(400).json({message: "All fields required"})
    // Validate rider ObjectId
    if (!mongoose.Types.ObjectId.isValid(rider)) {
        return res.status(400).json({ message: "Invalid rider ID" });
    }
    // Validate user ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    //check if user exist
    const userExist = await User.findOne({_id: user}).exec()
    if(!userExist) return res.status(400).json({message: "User does not exist"})
    //check if rider exist
    const riderExist = await Rider.findOne({_id: rider}).exec()
    if(!riderExist) return res.status(400).json({message: "Rider does not exist"})
    //Check if rider has been assigned a task
    if(riderExist.user && riderExist.status !== "Finished") return res.status(400).json({message: "Rider already assigned a task"})
    const newOrder = await Order.create({
        user,
        rider,
        productname,
        amount
    })
    riderExist.user = user
    riderExist.status = "Not Completed"
    riderExist.product = productname
    const result = await riderExist.save()
    res.json(newOrder)
})

const updateUserOrder = asyncHandler(async(req,res)=>{
    const {id,user,rider,productname,amount,status} = req.body
    if(!id || !user || !rider) return res.status(400).json({message: "All fields required"})
    const orderExist = await Order.findOne({_id: id}).exec()
    if(!orderExist) return res.status(400).json({message: "Order does not exist"})
    //check if user exist
    const userExist = await User.findOne({_id: user}).lean().exec()
    if(!userExist) return res.status(400).json({message:"User does not exist"})
    //check if rider exist
    const riderExist  = await Rider.findOne({_id: rider}).exec()
    if(!riderExist) return res.status(400).json({message:"Rider does not exist"})
    //check if rider is already assigned task
    if(riderExist.user && riderExist.status !== "Finished") return res.status(400).json({message: "Rider already assigned to a task"})
    if(user){
        // orderExist.user = user
        riderExist.user = user
    }
    if(rider){
        orderExist.rider = rider
    }
    if(productname){
        orderExist.productname = productname
        riderExist.product = productname
    }
    if(amount){
        orderExist.amount = amount
    }
    if(status){
        orderExist.status = status
        riderExist.status = status
    }
    const result1 = await riderExist.save()
    const result = await orderExist.save()
    res.json({message:"Order updated successfully"})
})
const deleteUserOrder = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) res.status(400).json({message: "Id required"})
    const findOrder = await Order.findById(id).exec()
    if(!findOrder) res.status(400).json({message: "Order does not exist"}) 
    const result = await findOrder.deleteOne()
    res.json({message: "Order deleted successfully"})
})
module.exports = {getAllUserOrder,createUserOrder,updateUserOrder,deleteUserOrder}