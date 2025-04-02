const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addItemToCart = async (req, res) => {
  try {
    const { user } = req;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      cart = new Cart({
        user: user.id,
        products: [],
        totalPrice: 0,
      });
    }

    const productInCart = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (productInCart) {
      productInCart.quantity += quantity;
      productInCart.price += quantity * product.price;
    } else {
      cart.products.push({
        product: productId,
        quantity,
        price: quantity * product.price,
      });
    }

    cart.totalPrice += quantity * product.price;
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found",
      });
    }

    // Count total unique products (length of products array)
    const totalProductItems = cart.products.length;

    // Format response
    const formattedCart = {
      _id: cart._id,
      user: cart.user,
      totalProductItems, // Add total product count (array length)
      products: cart.products.map((item) => ({
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.totalPrice,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };

    res.json({
      status: "success",
      message: "Cart retrieved successfully",
      data: formattedCart,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { user } = req;
    await Cart.findOneAndUpdate(
      { user: user.id },
      { products: [], totalPrice: 0 },
      { new: true }
    );

    return res.json({ message: "Cart cleared successfully", data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productInCart = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.totalPrice -= productInCart.price;
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { user } = req;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productInCart = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    cart.totalPrice -= productInCart.price;
    productInCart.quantity = quantity;
    productInCart.price = quantity * product.price;
    cart.totalPrice += productInCart.price;

    await cart.save();
    res.json(cart);
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
  addItemToCart,
  getCart,
  clearCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
