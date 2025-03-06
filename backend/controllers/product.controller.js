const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Category = require('../models/category.model');

const createProduct = async (req, res) => {
    try {
        const { name, quantity, price, description, image, category } = req.body;

        if (!name || quantity === undefined || price === undefined || !category) {
            return res.status(400).json({ status: 'error', message: 'Name, quantity, price, and category are required' });
        }

        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).json({ status: 'error', message: 'Invalid category ID' });
        }

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ status: 'error', message: 'Quantity must be a non-negative integer' });
        }

        if (!Number.isInteger(price) || price < 0) {
            return res.status(400).json({ status: 'error', message: 'Price must be a non-negative integer' });
        }

        if (description && description.length > 200) {
            return res.status(400).json({ status: 'error', message: 'Description must not exceed 200 characters' });
        }

        const categoryExists = await Category.findById(category).lean();
        if (!categoryExists) {
            return res.status(404).json({ status: 'error', message: 'Category not found' });
        }

        const newProduct = await Product.create({
            name,
            quantity,
            price,
            description,
            image: image || '',
            category
        });

        return res.status(201).json({ status: 'success', message: 'Product created successfully', data: newProduct });

    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name description').lean();
        return res.status(200).json({ status: 'success', message: 'Products retrieved successfully', data: products });
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID' });
        }

        const product = await Product.findById(id).populate('category', 'name description').lean();
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        return res.status(200).json({ status: 'success', message: 'Product retrieved successfully', data: product });

    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, price, description, image, category } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID' });
        }

        const updates = {};
        if (name) updates.name = name;
        if (quantity !== undefined) {
            if (!Number.isInteger(quantity) || quantity < 0) {
                return res.status(400).json({ status: 'error', message: 'Quantity must be a non-negative integer' });
            }
            updates.quantity = quantity;
        }
        if (price !== undefined) {
            if (!Number.isInteger(price) || price < 0) {
                return res.status(400).json({ status: 'error', message: 'Price must be a non-negative integer' });
            }
            updates.price = price;
        }
        if (description) {
            if (description.length > 200) {
                return res.status(400).json({ status: 'error', message: 'Description must not exceed 200 characters' });
            }
            updates.description = description;
        }
        if (category) {
            if (!mongoose.isValidObjectId(category)) {
                return res.status(400).json({ status: 'error', message: 'Invalid category ID' });
            }
            const categoryExists = await Category.findById(category).lean();
            if (!categoryExists) {
                return res.status(404).json({ status: 'error', message: 'Category not found' });
            }
            updates.category = category;
        }
        if (image) updates.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
        if (!updatedProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        return res.status(200).json({ status: 'success', message: 'Product updated successfully', data: updatedProduct });

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        return res.status(200).json({ status: 'success', message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
