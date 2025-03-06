const express = require('express');
const {createOrder, getAllOrders, getUserOrders, updateOrderStatus}  = require('../controllers/order.controller');

const router = express.Router();
router.post('/create', createOrder);
router.get('/', getUserOrders);
router.get('/all', getAllOrders);
// router.put('/update-status', updateOrderStatus);


module.exports = router;