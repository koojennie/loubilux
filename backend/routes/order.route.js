const express = require('express');
const { createOrderFromCart,
    getAllOrders, getUserOrders, updateOrderStatus, getFilteredOrdersReport, getOrderById, getMontlyRevenue, getRevenueByCategory } = require('../controllers/order.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/create', authenticateUser, authorizeRoles('user', 'admin', 'superadmin'), createOrderFromCart);
router.get('/all', authenticateUser, authorizeRoles('admin', 'superadmin'), getAllOrders);
router.get('/orderbyid/:orderId', authenticateUser, getOrderById)
router.get('/orderbyuser', authenticateUser, getUserOrders);
router.get('/montlyrevenue', authenticateUser, getMontlyRevenue);
router.get('/revenuepercategory', authenticateUser, authorizeRoles('admin', 'superadmin'), getRevenueByCategory)
router.put('/updatestatus', authenticateUser, authorizeRoles('admin', 'superadmin'), updateOrderStatus);
router.get('/report', authenticateUser, authorizeRoles('admin', 'superadmin'), getFilteredOrdersReport);


module.exports = router;