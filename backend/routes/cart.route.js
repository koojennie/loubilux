const express = require('express');
const router = express.Router();
const {addItemToCart, removeItemFromCart, getCart, clearCart, updateCartItemQuantity} = require('../controllers/cart.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

router.post('/add', authenticateUser, authorizeRoles('user', 'admin', 'superadmin') ,addItemToCart);
router.get('/', authenticateUser, authorizeRoles('user', 'admin', 'superadmin'), getCart);
router.put('/quantity', authenticateUser, authorizeRoles('user', 'admin', 'superadmin'), updateCartItemQuantity)
router.delete('/clear', authenticateUser, authorizeRoles('user', 'admin', 'superadmin'), clearCart);
router.delete('/remove',authenticateUser, authorizeRoles('user', 'admin', 'superadmin'), removeItemFromCart);

module.exports = router;