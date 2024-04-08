const Order = require("../../models/Orders")
const Rider = require("../../models/Rider")
const User = require("../../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const getAllRider=asyncHandler(async(req,res)=>{
    const riders  = await Rider.find()
    if(!riders.length) return res.status(400).json({message: "No riders found"})
    res.json(riders)
})

const createRider=asyncHandler(async(req,res)=>{
    const {username,password,phoneno} = req.body
    if(!username || !password  || !phoneno) return res.status(400).json("All fields required")
    const duplicate = await Rider.findOne({username}).exec()
    if(duplicate) return res.status(400).json({message: "Rider already exist"})
    const hashedPassword = await bcrypt.hash(password,10)
    const createRider = await Rider.create({
        username,
        password: hashedPassword,
        phoneno
    })
    res.status(200).json({message: "Rider created successfully"})
})

const updateRider = asyncHandler(async(req,res)=>{
    const {id,username,password,status} = req.body
    if(!id)return res.status(400).json({message: "User Id Required"})
    const findRider = await Rider.findOne({_id:id}).exec()
    if(!findRider)return res.status(400).json({message: "Could not find rider"})
    //check for duplicate
    const duplicate = await Rider.findOne({username}).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: "Duplicate User"})
    }
    findRider.username = username
    
    if(password){
        findRider.password = await bcrypt.hash(password,10)
    }
    const result = await findRider.save()
    res.json({message: `User ${username} successfully updated`})
}
)

const deleteRider = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id)return res.status(400).json({message:"Rider Id required"})
    const findRider = await Rider.findById(id).exec()
    if(!findRider) return res.status(400).json({message: "Could not find user"})
    if(findRider.user && findRider.status != "Finished")return res.status(400).json({message: "cannot delete a rider that is assigned to a task"})
    const result = await findRider.deleteOne()
    const reply = `Rider with username:${findRider.username} and id ${id} successfully deleted`
    res.json(reply)
})

module.exports = {getAllRider,createRider,updateRider,deleteRider}