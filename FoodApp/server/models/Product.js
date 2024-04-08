const mongoose = require("mongoose")

const {Schema} = mongoose

const productSchema = new Schema({
    productimage:{
        type: String,
        required: true
    },
    productname:{
        type: String,
        required: true
    },
    productprice:{
        type: Number,
        required: true
    },
    productcategory:{
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
})

module.exports = mongoose.model("Product",productSchema)