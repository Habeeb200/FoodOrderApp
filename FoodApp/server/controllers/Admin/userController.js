const User  = require("../../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
//Get all users
const getAllUser = asyncHandler(async(req,res)=>{
    const result = await User.find().select("-password")
    if(!result.length) return res.status(400).json({message: "No users found"})
    res.json(result)
})

//Create a user
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

//update a user
const updateUser = asyncHandler(async(req,res)=>{
    const ids = req.params
    const id = new mongoose.Types.ObjectId(ids)
    const {username,image,email,phone,address} = req.body
    if(!id)return res.status(400).json({message: "User Id Required"})
    const findUser = await User.findOne({_id: id}).exec()
    if(!findUser)return res.status(400).json({message: "Could not find User"})
    //check for duplicate
    if(username){
        findUser.username = username
    }
    if(image){
        findUser.image = image
    }
    if(email){
        findUser.email = email
    }
    if(phone){
        findUser.phone = phone
    }
    if(address){
        findUser.address = address
    }
    const result = await findUser.save()
    res.json({message: `User ${username} successfully updated`})
}
)

//Delete a user
const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id)return res.status(400).json({message:"User Id required"})
    const findUser = await User.findById(id).exec()
    if(!findUser) return res.status(400).json({message: "Could not find user"})
    const result = await findUser.deleteOne()
    const reply = `User with username:${findUser.username} and id ${id} successfully deleted`
    res.json(reply)
})

//get a user
const getUser = asyncHandler(async(req,res)=>{
    const{name} = req.params
    if(!name) return res.status(400).json({message: "Username required"})
    const findUser = await User.findOne({username: name}).select("-password").exec()
    if(!findUser)return res.status(400).json({message:"User does not exist"})
    res.status(200).json(findUser)
})
const getUserById = asyncHandler(async(req,res)=>{
    const id = req.userId
    if(!id) return res.status(400).json({message: "Username required"})
    const findUser = await User.findOne({_id: id}).exec()
    console.log(findUser)
    if(!findUser)return res.status(400).json({message:"User does not exist"})
    res.status(200).json(findUser)
})
module.exports = {getAllUser,createUser,updateUser,deleteUser,getUser,getUserById}