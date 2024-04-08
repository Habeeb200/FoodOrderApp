const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:{
        type:String,
        default: "User"
    },
    active:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User",userSchema)