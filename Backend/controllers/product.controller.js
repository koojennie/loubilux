const Product = require('../models/product.models');
const Category = require('../models/category.model');

const createProduct = async (req, res) => {
    try {
        const { name, quantity, price, description, image, category } = req.body;

        if (!name || quantity === undefined || price === undefined || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, quantity, price, and category fields are required'
            });
        }

        if (quantity < 0 || price < 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Quantity and price must be greater than or equal to 0'
            });
        }

        if (!Number.isInteger(quantity) || !Number.isInteger(price)) {
            return res.status(400).json({
                status: 'error',
                message: 'Quantity and price must be an integer'
            });
        }

        if (description && description.length > 200) {
            return res.status(400).json({
                status: 'error',
                message: 'Description must not exceed 200 characters'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid category ID format'
            });
        }

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        const imageUrl = image || '';

        const newProduct = new Product({
            name,
            quantity,
            price,
            description,
            image: imageUrl,
            category
        });

        await newProduct.save();

        return res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: newProduct
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name description');

        return res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId).populate('category', 'name description');

        if(!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
                data: product
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Product retrieved successfully',
            data: product
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.quantity !== undefined) {
            if (!Number.isInteger(req.body.quantity) || req.body.quantity < 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Quantity must be a non-negative integer'
                });
            }
            updates.quantity = req.body.quantity;
        }
        if (req.body.price !== undefined) {
            if (!Number.isInteger(req.body.price) || req.body.price < 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Price must be a non-negative integer'
                });
            }
            updates.price = req.body.price;
        }
        if (req.body.category) {
            const categoryExists = await Category.findById(req.body.category);
            if (!categoryExists) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid category ID'
                });
            }
            updates.category = req.body.category;
        }
        if (req.body.description) {
            if (req.body.description.length > 200) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Description must not exceed 200 characters'
                });
            }
            updates.description = req.body.description;
        }
        if (req.body.image) updates.image = req.body.image;

        // Update product di database
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });

        return res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: updatedProduct
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        await product.remove();

        return res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }; 