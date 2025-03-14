const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        status:{
            type:String,
            default: "draft",
            enum:["active","draft"]
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;