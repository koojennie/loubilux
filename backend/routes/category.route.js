const express = require('express');
const router = express.Router();

const { createCategory,getCategories, updateCategory, deleteCategory, getCategoryById } = require('../controllers/category.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');


router.post('/',authenticateUser, authorizeRoles('admin', 'superadmin') ,createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', authenticateUser, authorizeRoles('admin', 'superadmin'), updateCategory);
router.delete('/:id', authenticateUser, authorizeRoles('admin', 'superadmin'), deleteCategory);


module.exports = router;
