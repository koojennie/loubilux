const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        prefix: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
