const jwt = require("jsonwebtoken")
const User = require("../models/User")
const verifyAccessToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    console.log("token received successfully")
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.status(400).json({message:"Log in again"})
            req.userId = decoded.id;
            console.log("middleware executed")
            next()
        }
    )
}
module.exports = verifyAccessToken