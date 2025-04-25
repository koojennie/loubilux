const { Cart, Product, CartItem } = require('../models/index')

const addItemToCart = async (req, res) => {
  try {
    const { user } = req;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ where: { userId: user.id } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id, totalPrice: 0 });
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: product.id }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.price += quantity * product.price;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: product.id,
        quantity,
        price: quantity * product.price,
      });
    }

    cart.totalPrice += quantity * product.price;
    await cart.save();

    res.json({ message: "Item added to cart", data: cartItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
  
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });

    // Kalau cart belum ada, bikin cart baru kosong
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, totalPrice: 0 });
    }

    const totalProductItems = cart.cartItems ? cart.cartItems.length : 0;

    const formattedCart = {
      id: cart.id,
      user: cart.userId,
      totalProductItems,
      products: cart.cartItems ? cart.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })) : [],
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
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    cart.totalPrice = 0;
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};


const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.totalPrice -= cartItem.price;
    await cartItem.destroy();
    await cart.save();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update
    cart.totalPrice -= cartItem.price;
    cartItem.quantity = quantity;
    cartItem.price = quantity * product.price;
    cart.totalPrice += cartItem.price;

    await cartItem.save();
    await cart.save();

    res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  addItemToCart,
  getCart,
  clearCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
