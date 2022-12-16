const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price can not exceeded 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
            }
        }

    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock can not be exceeded 4 characters"],
        default:1
    },
    "reviews":[
        {
            name:{
                type:String,
                required:true

            },
            rating:{
                type:Number,
                requitred:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createAdt:{
        type:Date,
        default:Date.now
    }
})

const Product = new mongoose.model("Product",productSchema);
module.exports = Product;