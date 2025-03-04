const express = require('express');
const router = express.Router();

const {addItemToCart, removeItemFromCart, getCart, clearCart} = require('../controllers/cart.controller');

router.post('/add', addItemToCart);
router.get('/', getCart);
router.delete('/clear', clearCart);
router.delete('/remove', removeItemFromCart);

module.exports = router;