const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true
        },
        productCode: {
            type : String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            min:0,
            default: 0
        },
        description: {
            type: String,
            default: "",
        },
        images: [{
            type: String,
            default: "",
        }],
        statusPublish:{
            type: String,
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

ProductSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); 

    try {
        const category = await mongoose.model('Category').findById(this.category);        

        if (!category) {
            throw new Error('Category not found'); 
        }

        const prefix = category.prefix;
        const lastProduct = await this.constructor.findOne({ category: this.category })
            .sort({ createdAt: -1 }) 
            .select('productCode');

        let newNumber = '00001'; 

        if (lastProduct && lastProduct.productCode) {
            const lastNumber = parseInt(lastProduct.productCode.split('-')[1]);
            newNumber = String(lastNumber + 1).padStart(5, '0'); 
        }

        
        this.productCode = `${prefix}-${newNumber}`;
        next();
    } catch (error) {
        next(error);
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;