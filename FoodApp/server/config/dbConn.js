const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const dbConn = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            
        })
    }catch(err){
        console.error(err)
    }
}

module.exports = dbConn