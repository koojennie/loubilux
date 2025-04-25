const express = require('express');

const authRouter = require('./auth.route');
const usersRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRouter = require('./product.route');
const cartRouter = require('./cart.route');
const orderRouter = require('./order.route');
const reviewRouter = require('./review.route');
const paymentMidtransRouter = require('./payments.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter)
// router.use('/review', reviewRouter);
// router.use('/payments', paymentMidtransRouter);

module.exports = router;