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
        const { productCode, name, quantity, price, description, newImages = [], deletedImages = [], category, statusPublish, oldImagesStillExists = [] } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid product ID' });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        const updates = {};
        if (productCode) updates.productCode = productCode;
        if (name) updates.name = name;
        if (quantity !== undefined) updates.quantity = quantity;
        if (price !== undefined) updates.price = price;
        if (description) updates.description = description;
        if (category) updates.category = category;
        if (statusPublish) updates.statusPublish = statusPublish;

        // **Hapus Gambar dari Cloudinary jika ada**
        if (deletedImages.length > 0) {
            for (const imageUrl of deletedImages) {
                try {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`products/${publicId}`);
                } catch (error) {
                    console.error("Error deleting image from Cloudinary:", error);
                }
            }

            // **Hapus Gambar dari MongoDB**
            await Product.findByIdAndUpdate(id, {
                $pull: { images: { $in: deletedImages } }
            });
        }

        // **Update gambar yang masih ada (oldImagesStillExists)**
        updates.images = oldImagesStillExists;

        // **Upload Gambar Baru ke Cloudinary jika ada**
        if (newImages.length > 0) {
            for (const imageBase64 of newImages) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
                        folder: 'products'
                    });

                    if (uploadResponse && uploadResponse.secure_url) {
                        updates.images.push(uploadResponse.secure_url);
                    }
                } catch (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                }
            }
        }

        // **Update Product di MongoDB**
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();

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
