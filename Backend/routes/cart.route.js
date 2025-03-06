const express = require('express');
const router = express.Router();

const {addItemToCart, removeItemFromCart, getCart, clearCart} = require('../controllers/cart.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

router.post('/add', authenticateUser, authorizeRoles('user') ,addItemToCart);
router.get('/', authenticateUser, authorizeRoles('user'), getCart);
router.delete('/clear', authenticateUser, authorizeRoles('user'), clearCart);
router.delete('/remove',authenticateUser, authorizeRoles('user'), removeItemFromCart);

module.exports = router;