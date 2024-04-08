const mongoose = require("mongoose")
const AutoIncreement = require("mongoose-sequence")(mongoose)
const {Schema} = mongoose

const riderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneno:{
        type:Number,
        required: true
    },
    roles:[{
        type:String,
        default: "Rider"
    }],
    status:{
        type:String,
    },
    product:{
        type:String
    },
    active:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Rider",riderSchema)


