const {Order,ProductOrdered}  = require("../../models/Orders")
const Product = require("../../models/Product")
const Rider = require("../../models/Rider")
const User = require("../../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")

// riders can log in and see the task allocated to him and also update the status of the transaction
const loginRider=asyncHandler(async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password) res.status(400).json({message: "All fields required"})
    const findRider = await Rider.findOne({username}).exec()
    if(!findRider)return res.status(400).json({message: "Rider not found"})
    const match = await bcrypt.compare(password,findRider.password)
    if(!match)return res.status(400).json("Password is incorrect")
    findRider.active = true
    const result = await findRider.save()
    res.status(200).json("Rider logged in successfully")
})

const seeRiderTask=asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id)return res.status(400).json({messsage: "Rider Id required"})
    const findOrders = await Order.find({rider: id}).exec()
    if(!findOrders.length) return res.status(400).json({message: "No orders found"})
    res.json(findOrders)
})
const updateTransaction = asyncHandler(async(req,res)=>{
    const {id,status} = req.body
    if(!id || !status) return res.status(400).json({message: "All fields required"})
    const findOrder = await Order.findOne({_id: id}).exec()
    if(!findOrder)return res.status(400).json({message: "Cannot find order"})
    if(status == "Finished"){
        findOrder.status = status
        findOrder.user = null
        findOrder.productname = null
        findOrder.amount = null
    }
    findOrder.status = status
    const result = await findOrder.save()
    res.status(200).json({message: "Order updated successfully"})
})
module.exports = {loginRider,seeRiderTask,updateTransaction}