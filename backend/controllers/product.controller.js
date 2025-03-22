const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const cloudinary = require('../lib/cloudinary');

const createProduct = async (req, res) => {

    try {
        let { productCode, name, quantity, price, description, images, category } = req.body;
        
        quantity = Number(quantity);
        price = Number(price);

        if (!name || quantity === undefined || price === undefined || !category || !productCode) {
            return res.status(400).json({ status: 'error', message: 'Product Code, Name, quantity, price, and category are required' });
        }

        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).json({ status: 'error', message: 'Invalid category ID' });
        }

        console.log("ini adalah quantity", typeof(quantity));

        
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

        let imageUrls = [];

        if (req.body.images && req.body.images.length > 0) {
          
            for (const imageBase64 of req.body.images) {
              try {
                const uploadedResponse = await cloudinary.uploader.upload(imageBase64, {
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
        category,
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
        sortOrder = sortOrder === 'desc' ? -1 : 1; // Default ascending (1), descending (-1)
        
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder;
        }

        const query = {};
        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
        }

        const totalProducts = await Product.countDocuments(query); 
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find(query)
            .populate('category', 'name description')
            .sort(sortOptions)
            .skip((page - 1) * limit) 
            .limit(limit) 
            .lean();

        return res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            total: totalProducts, 
            page,
            limit,
            totalPages, 
            data: products
        });
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
        const { name, quantity, price, description, image, category, statusPublish } = req.body;

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

        if (statusPublish) updates.statusPublish = statusPublish;


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

const countProductByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        if(!categoryId){
            return res.status(400).json({status: "error", message:"Category ID is required"});
        }

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({status: "error", message: "category not found"});
        }

        const countProductByCategory = await Product.countDocuments({ category: categoryId });

        return res.status(200).json({status: "success", prefix: category.prefix, countProductByCategory});
        
    } catch (error) {
        return res.status(500).json({status: 'error', message: 'error fetching product count', error: error.mesage})
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    countProductByCategory
};
