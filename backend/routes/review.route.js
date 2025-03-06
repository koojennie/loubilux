const express = require('express');
const router = express.Router();

const {createReview, getProductReviews, getUserReviews, updateReviewProduct, deleteReviewProduct} = require('../controllers/review.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

router.post('/', authenticateUser, createReview);
router.get('/product/:productId', authenticateUser, getProductReviews);
router.get('/user',authenticateUser, getProductReviews);
router.put('/:reviewId', authenticateUser, updateReviewProduct);
router.delete('/:reviewId', authenticateUser, deleteReviewProduct);

module.exports = router;