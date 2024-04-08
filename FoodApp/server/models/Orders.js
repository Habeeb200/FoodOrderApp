const mongoose = require("mongoose")
const AutoIncreement = require("mongoose-sequence")(mongoose)
const {Schema} = mongoose

const orderSchema = new Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rider:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Rider"
    },
    productname:{
        type: String,
    },
    amount:{
        type:Number
    },
    status:{
        type: String,
        default: "Pending"
    },
    },
    {
        timestamps:true 
     }
)
orderSchema.plugin(AutoIncreement,{
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq:500
})
module.exports = mongoose.model("Order",orderSchema)