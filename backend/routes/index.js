const express = require('express');

const authRouter = require('./auth.route');
const usersRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/orders', orderRouter)
router.use('/categories', categoryRouter);
router.use('/products', productRouter);

module.exports = router;