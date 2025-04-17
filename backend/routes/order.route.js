const express = require('express');
const {createOrderFromCart, getAllOrders, getUserOrders, updateOrderStatus, getFilteredOrdersReport}  = require('../controllers/order.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/create', authenticateUser, authorizeRoles('user'), createOrderFromCart);
router.get('/all', authenticateUser,authorizeRoles('admin', 'superadmin'), getAllOrders);
router.get('/order',authenticateUser, getUserOrders);
router.put('/update-status', authenticateUser, authorizeRoles('admin', 'superadmin'), updateOrderStatus);
router.get('/report', authenticateUser, authorizeRoles('admin', 'superadmin'), getFilteredOrdersReport);


module.exports = router;