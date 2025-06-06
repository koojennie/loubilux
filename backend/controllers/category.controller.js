const { Op } = require('sequelize'); 
const Category = require('../models/category.model'); 

// Create
const createCategory = async (req, res) => {
    try {
        const {categoryId ,name, description, prefix } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'error',
                message: 'Category Name fields are required'
            });
        }

        if (description.length > 200) {
            return res.status(400).json({
                status: 'error',
                message: 'Description must be not greater than 200 characters'
            });
        }

        const existingCategory = await Category.findOne({ where: { name } });

        if (existingCategory) {
            return res.status(400).json({
                status: 'error',
                message: 'Category already exists'
            });
        }

        const category = await Category.create({
            categoryId,
            name,
            description,
            prefix
        });

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
};

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Category retrieved successfully',
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
};

const getCategories = async (req, res) => {
    try {
        let { page, limit, sortOrder, sortBy, searchQuery } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        sortOrder = sortOrder === 'desc' ? 'DESC' : 'ASC';

        const where = {};
        if (searchQuery) {
            where.name = { [Op.iLike]: `%${searchQuery}%` }; // Using Sequelize's Op.iLike for case-insensitive search
        }

        const { count: totalCategories, rows: categories } = await Category.findAndCountAll({
            where,
            order: sortBy ? [[sortBy, sortOrder]] : [],
            offset: (page - 1) * limit,
            limit
        });

        const totalPages = Math.ceil(totalCategories / limit);

        return res.status(200).json({
            status: 'success',
            message: 'Categories retrieved successfully',
            total: totalCategories,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
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
};

const updateCategory = async (req, res) => {
    try {
        const { name, description, prefix } = req.body;
        const categoryId = req.params.id;

        const [updated] = await Category.update(
            { name, description, prefix },
            { where: { categoryId } }
        );

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

        const category = await Category.findByPk(categoryId);

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
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const deleted = await Category.destroy({ where: { categoryId } });

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found'
            });
        }

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
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };