const express = require('express');

const authRouter = require('./auth.route');
const usersRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');
const cartRouter = require('./cart.route');
const reviewRouter = require('./review.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/orders', orderRouter)
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/review', reviewRouter);

module.exports = router;