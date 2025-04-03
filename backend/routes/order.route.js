const express = require('express');
const {createOrderFromCart, getAllOrders, getUserOrders, updateOrderStatus}  = require('../controllers/order.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/create', authenticateUser, authorizeRoles('user'), createOrderFromCart);
router.get('/all', authenticateUser,authorizeRoles('admin', 'superadmin'), getAllOrders);
router.get('/',authenticateUser, getUserOrders);
router.put('/update-status', authenticateUser, authorizeRoles('admin', 'superadmin'), updateOrderStatus);


module.exports = router;