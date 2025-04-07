const Review = require("../models/review.model");
const Product = require("../models/product.model");
const Order = require("../models/order.models");

const createReview = async (req, res) => {
  try {
    const { user } = req;
    const { rating, comment, productId, orderId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      user: user.id,
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "You can only review a product after completing the order",
      });
    }

    const productExistsInOrder = order.orderlineitems.some((item) =>
      item.equals(productId)
    );

    if (!productExistsInOrder) {
      return res.status(404).json({
        status: "error",
        message: "You can only review a product that you have ordered",
      });
    }

    const existingReview = await Review.findOne({
      user: user.id,
      product: productId,
    });
    if (existingReview) {
      return res.status(400).json({
        status: "error",
        message: "You have already reviewed this product",
      });
    }

    const review = new Review({
      user: user.id,
      product: productId,
      order: orderId,
      rating,
      comment,
    });

    await review.save();

    return res.status(201).json({
      status: "success",
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ user: userId })
      .populate("product", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "User reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "Product reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "All reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateReviewProduct = async (req, res) => {
  const { rating, comment } = req.body;
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update this review",
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    return res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteReviewProduct = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this review",
      });
    }

    await review.remove();

    return res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getUserReviews,
  getProductReviews,
  updateReviewProduct,
  deleteReviewProduct,
  getAllReviews
};
