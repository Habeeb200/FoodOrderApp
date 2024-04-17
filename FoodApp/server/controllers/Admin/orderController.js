const Rider = require("../../models/Rider")
const User = require("../../models/User")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const {Order,ProductOrdered}  = require("../../models/Orders")
const Product = require("../../models/Product")


//Admin can get all orders and users can not get all orders
const getAllUserOrder=asyncHandler(async(req,res)=>{
    const orders = await Order.find()
    if(!orders.length) return res.status(400).json({message: "No orders found"})
    res.json(orders)
})
//Admin and users can create an order
const createUserOrder = asyncHandler(async(req,res)=>{
    const {user,orders} = req.body
    if(!user || !orders) return res.status(400).json({message: "All fields required"})
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    //check if user exist
    const userExist = await User.findOne({_id: user}).exec()
    if(!userExist) return res.status(400).json({message: "User does not exist"})
    //check if product exist
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

const updateUserOrder = asyncHandler(async(req,res)=>{
    const {orderid,userid,riderid,productid,status,productquantity} = req.body
    if(!orderid || !userid || !riderid) return res.status(400).json({message: "All fields required"})
    const orderExist = await Order.findOne({_id: orderid}).exec()
    if(!orderExist) return res.status(400).json({message: "Order does not exist"})
    //check if user exists
    const userExist = await Order.findOne({user: userid}).lean().exec()
    if(!userExist) return res.status(400).json({message:"User does not own order you are trying to update"})
    //check if product exist
    const productExist = orderExist.products.find((product)=> product._id == productid)
    if(!productExist) return res.status(400).json({message:"Product does not exist"})
    //check if rider exist
    const riderExist  = await Rider.findOne({_id: riderid}).exec()
    if(!riderExist) return res.status(400).json({message:"Rider does not exist"})
    // check if rider is already assigned task
    if(riderExist.user && riderExist.status !== "Finished") return res.status(400).json({message: "Rider already assigned to a task"})
    if(userid){
        riderExist.user = userid
    }
    if(riderid){
        if(status == "Finished"){
            riderExist.orders = null
            riderExist.user = null
        }else{
            riderExist.orders = userExist.products
        }
    }
    if(productquantity){
        productExist.quantity = productquantity
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