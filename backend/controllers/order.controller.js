const { Op } = require("sequelize");
const { Order, User, OrderLineItem, Product, Cart, CartItem } = require("../models");


const generateOrdersId = async () => {
  const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const orderCount = await Order.count({
    where: {
      createdAt: {
        [Op.gte]: new Date().setHours(0, 0, 0, 0),
      },
    },
  });
  return `ORD-${datePart}-${String(orderCount + 1).padStart(3, '0')}`;
};


const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const selectedProductIds = req.body.selectedProducts;

    if (!selectedProductIds?.length) {
      return res.status(400).json({ message: "No products selected for checkout" });
    }

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        as: "cartItems",
        include: { model: Product, as: "product" }
      }
    });

    if (!cart || !cart.cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const selectedItems = cart.cartItems.filter(item =>
      selectedProductIds.includes(item.productId) && item.product !== null
    );

    if (!selectedItems.length) {
      return res.status(400).json({ message: "Selected products are not in the cart" });
    }

    const totalPrice = selectedItems.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    const orderId = await generateOrdersId();

    const newOrder = await Order.create({
      orderId,
      userId,
      totalPrice,
      status: "Pending",
      paymentMethod: req.body.paymentMethod || "COD",
      shippingAddress: req.body.shippingAddress,
      courier: req.body.courier || {
        name: "Standard",
        shippingCost: 0,
        trackingNumber: null,
        estimatedDelivery: null,
      },
    });

    for (const item of selectedItems) {
      await OrderLineItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        subPrice: item.product.price * item.quantity,
      });
    }

    // Remove ordered items from cart
    await CartItem.destroy({
      where: {
      cartId: cart.id,
      productId: selectedProductIds,
      },
    });

    // Update cart total to 0
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ status: "error", message: "Server Error", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: {
        model: OrderLineItem,
        as: "orderLineItems",
        include: {
          model: Product,
          as: "product",
          attributes: ["name"],
        },
      },
    });

    const data = orders.map(order => ({
      id: order.id,
      userId: order.userId,
      totalPrice: order.totalPrice,
      status: order.status,
      paymentMethod: order.paymentMethod,
      orderDate: new Date(order.createdAt).toLocaleString(),
      shippingAddress: order.shippingAddress,
      courier: order.courier,
      items: order.orderLineItems.map(item => ({
        id: item.id,
        product: item.product?.name || "Deleted Product",
        quantity: item.quantity,
        subPrice: item.subPrice,
      })),
    }));

    res.status(200).json({ status: "success", message: "Orders retrieved", data });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count: totalOrders, rows: orders } = await Order.findAndCountAll({
      offset,
      limit: parseInt(limit),
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: OrderLineItem,
          as: "orderLineItems",
          include: {
            model: Product,
            as: "product",
            attributes: ["id", "name", "price"]
          },
        },
      ],
    });

    const data = orders.map(order => ({
      id: order.id,
      orderId: order.orderId,
      userId: order.user?.id || "Guest",
      user: order.user?.name || "Guest",
      email: order.user?.email || "-",
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      orderDate: new Date(order.createdAt).toLocaleString(),
      courier: order.courier?.name || "Not Assigned",
      items: order.orderLineItems.map(item => ({
        productId: item.product?.id || "",
        productName: item.product?.name || "Deleted Product",
        productPrice: item.product?.price || 0,
        quantity: item.quantity,
        subPrice: item.subPrice,
      })),
    }));

    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      data
    });

  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ status: "error", message: "Server Error", error: error.message });
  }
};

const getFilteredOrdersReport = async (req, res) => {
  try {
    const { month, year, startDate, endDate } = req.query;
    const where = {};

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      where.createdAt = { [Op.between]: [start, end] };
    } else if (startDate && endDate) {
      where.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    } else if (year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      where.createdAt = { [Op.between]: [start, end] };
    }

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
        {
          model: OrderLineItem,
          as: "orderLineItems",
          include: {
            model: Product,
            as: "product",
            attributes: ["name", "price"],
          },
        },
      ],
    });

    const data = orders.map(order => ({
      orderId: order.orderId,
      user: order.user?.name || "Guest",
      email: order.user?.email || "-",
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      orderDate: new Date(order.createdAt).toLocaleString(),
      courier: order.courier?.name || "Not Assigned",
      items: order.orderLineItems.map(item => ({
        productName: item.product?.name || "Deleted Product",
        productPrice: item.product?.price || 0,
        quantity: item.quantity,
        subPrice: item.subPrice,
      })),
    }));

    res.status(200).json({
      status: "success",
      totalOrders: data.length,
      data,
    });

  } catch (error) {
    console.error("Error getting filtered report:", error);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ status: "error", message: "Invalid order status" });
    }

    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ status: "error", message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderFromCart,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getFilteredOrdersReport
};
