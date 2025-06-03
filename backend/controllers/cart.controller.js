const { Cart, Product, CartItem, User, Category} = require('../models/index');

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

    let lastCartItem = await CartItem.findOne({
      order: [['createdAt', 'DESC']],
      attributes: ['cartItemId']
    });

    let cartItemId = null;
    if (lastCartItem && lastCartItem.cartItemId) {
      const lastCartItemNumber = parseInt(lastCartItem.cartItemId.split('-')[1], 10);
      cartItemId = `CARTITEM-${String(lastCartItemNumber + 1).padStart(5, '0')}`;
    } else {
      cartItemId = 'CARTITEM-00001';
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.cartId, productId: product.productId }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalPrice += quantity * product.price;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartItemId,
        cartId: cart.cartId,
        productId: product.productId,
        quantity,
        subPrice: quantity * product.price,
      });
    }

    cart.totalPrice += quantity * product.price;
    await cart.save();

    res.json({ message: "Item added to cart", dataCartItem: cartItem, dataCart: cart});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const getCart = async (req, res) => {
  const { user } = req;

  try {
    let cart = await Cart.findOne({
      where: { userId: user.id },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['productId', 'name', 'price', 'images'],
              // include: [
              //   {
              //     model: Category,
              //     as: 'category',
              //     attributes: ['name']
              //   }
              // ]
            },
          ],
        },
      ],
    });

    let userFind = await User.findOne({
      where: { userId: user.id },
      attributes: ["userId"]
    });

    let cartId = null;
    if (userFind) {
      const lastCart = await Cart.findOne({
        order: [['createdAt', 'DESC']],
        attributes: ['cartId']
      });

      if (lastCart && lastCart.cartId) {
        const lastCartNumber = parseInt(lastCart.cartId.split('-')[1], 10);
        cartId = `CART-${String(lastCartNumber + 1).padStart(4, '0')}`;
      } else {
        cartId = 'CART-0001';
      }
    }

    if (!cart) {
      cart = await Cart.create({ cartId: cartId, userId: req.user.id, totalPrice: 0 });
    }

    const totalProductItems = cart.cartItems ? cart.cartItems.length : 0;

    const formattedCart = {
      cartId: cart.cartId,
      userId: cart.userId,
      totalProductItems,
      products: cart.cartItems ? cart.cartItems.map(item => ({
        cartItemId: item.cartItemId,
        product: item.product,
        quantity: item.quantity,
        subTotal: item.subTotal,
        images: item.product.images,
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

    await CartItem.destroy({ where: { cartId: cart.cartId } });

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
      where: { cartId: cart.cartId, productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.totalPrice -= cartItem.subTotal;
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
      where: { cartId: cart.cartId, productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    cart.totalPrice -= cartItem.subTotal;
    cartItem.quantity = quantity;
    cartItem.subTotal = quantity * product.price;
    cart.totalPrice += cartItem.subTotal;

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
