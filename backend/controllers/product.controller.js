const { Op } = require('sequelize');
const cloudinary = require('../lib/cloudinary');
const {Category, Product} = require('../models');
// const Product = require("../models/products.model");

const createProduct = async (req, res) => {
    try {
        let { productCode, name, quantity, price, description, images, category } = req.body;

        quantity = Number(quantity);
        price = Number(price);

        if (!name || quantity === undefined || price === undefined || !category || !productCode) {
            return res.status(400).json({ status: 'error', message: 'Product Code, Name, quantity, price, and category are required' });
        }

        const categoryExists = await Category.findByPk(category);
        if (!categoryExists) {
            return res.status(404).json({ status: 'error', message: 'Category not found' });
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

        let imageUrls = [];
        if (images && images.length > 0) {
            for (const imageBase64 of images) {
                try {
                    const uploadedResponse = await cloudinary.uploader.upload(imageBase64, {
                        folder: 'products',
                        upload_preset: "ml_default",
                    });
                    imageUrls.push(uploadedResponse.secure_url);
                } catch (error) {
                    console.error("Cloudinary Upload Error:", error);
                }
            }
        }

        const newProduct = await Product.create({
            productCode,
            name,
            quantity,
            price,
            description,
            images: imageUrls.length > 0 ? imageUrls : [],
            categoryId: category,
        });

        return res.status(201).json({ status: 'success', message: 'Product created successfully', data: newProduct });

    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let { page, limit, sortOrder, sortBy, searchQuery } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        sortOrder = sortOrder === 'desc' ? 'DESC' : 'ASC';

        const where = {};
        if (searchQuery) {
            where.name = { [Op.iLike]: `%${searchQuery}%` }; // Case-insensitive search
        }

        const { count: totalProducts, rows: products } = await Product.findAndCountAll({
            where,
            include: [{ model: Category, attributes: ['name', 'description'] }],
            order: sortBy ? [[sortBy, sortOrder]] : [],
            offset: (page - 1) * limit,
            limit,
        });

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            total: totalProducts,
            page,
            limit,
            totalPages,
            data: products,
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [{ model: Category, attributes: ['name', 'description'] }],
        });
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
        const { productCode, name, quantity, price, description, newImages = [], deletedImages = [], category, statusPublish, oldImagesStillExists = [] } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        const updates = {};
        if (productCode) updates.productCode = productCode;
        if (name) updates.name = name;
        if (quantity !== undefined) updates.quantity = quantity;
        if (price !== undefined) updates.price = price;
        if (description) updates.description = description;
        if (category) updates.categoryId = category;
        if (statusPublish) updates.statusPublish = statusPublish;

        // Delete images from Cloudinary
        if (deletedImages.length > 0) {
            for (const imageUrl of deletedImages) {
                try {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`products/${publicId}`);
                } catch (error) {
                    console.error("Error deleting image from Cloudinary:", error);
                }
            }
        }

        // Update images
        updates.images = oldImagesStillExists;

        // Upload new images to Cloudinary
        if (newImages.length > 0) {
            for (const imageBase64 of newImages) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
                        folder: 'products',
                    });

                    if (uploadResponse && uploadResponse.secure_url) {
                        updates.images.push(uploadResponse.secure_url);
                    }
                } catch (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                }
            }
        }

        // Update product in the database
        await product.update(updates);

        return res.status(200).json({ status: 'success', message: 'Product updated successfully', data: product });

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        await product.destroy();

        return res.status(200).json({ status: 'success', message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const countProductByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        if (!categoryId) {
            return res.status(400).json({ status: "error", message: "Category ID is required" });
        }

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ status: "error", message: "Category not found" });
        }

        const countProductByCategory = await Product.count({ where: { categoryId } });

        return res.status(200).json({ status: "success", prefix: category.prefix, countProductByCategory });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error fetching product count', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    countProductByCategory,
};
