const mongoose = require("mongoose")
const AutoIncreement = require("mongoose-sequence")(mongoose)
const {Schema} = mongoose


const productSchema = new Schema({
    productimage:String,
    productname: {
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Burrito.JPG/640px-Burrito.JPG"
    },
    amount: Number,
    quantity: Number
});
const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rider"
        },
        products: [productSchema], // Array of product objects
        status: {
            type: String,
            default: "Pending"
        }
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
module.exports = {
    Order: mongoose.model("Order", orderSchema),
    ProductOrdered: mongoose.model("ProductOrdered", productSchema)
};