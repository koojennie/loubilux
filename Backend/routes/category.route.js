const express = require('express');
const router = express.Router();

const { createCategory,getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');


router.post('/',authenticateUser, authorizeRoles('admin', 'superadmin') ,createCategory);
router.get('/', getCategories);
router.put('/:id',authorizeRoles('admin', 'superadmin'), updateCategory);
router.delete('/:id',authorizeRoles('admin', 'superadmin'), deleteCategory);


module.exports = router;
