const Category = require('../models/category.model');

// Create 
const createCategory = async (req, res) => {
    try {
        const { name, description, prefix} = req.body;

        if(!name) {
            return res.status(400).json({
                status: 'error',
                message: 'Category Name fields are required'
            });
        }

        if(description.length > 200){
            return res.status(400).json({
                status: 'error',
                message: 'Description must be not greater than 200 characters'
            });
        }

        const existingCategory = await Category.findOne({name: name});

        if(existingCategory) {
            return res.status(400).json({
                status: 'error',
                message: 'Category already exists'
            });
        }

        const category = new Category({
            name,
            description,
            prefix
        });

        await category.save();

        return res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: category
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

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            status: 'success',
            message: 'Categories retrieved successfully',  
            data: categories
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

const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const categoryId = req.params.id;

        if(!name || !description) {
            return res.status(400).json({
                status: 'error',
                message: 'Category Name and Description fields are required'
            });
        }

        const category = await Category.findByIdAndUpdate(categoryId, {
            name,
            description
        }, {new: true});

        return res.status(200).json({
            status: 'success',
            message: 'Category updated successfully',
            data: category
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

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        await Category.findByIdAndDelete(categoryId);

        return res.status(200).json({
            status: 'success',
            message: 'Category deleted successfully'
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

module.exports = {createCategory, getCategories ,updateCategory, deleteCategory};