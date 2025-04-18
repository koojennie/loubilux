const mongoose = require("mongoose");
const Order = require("../models/order.model");
const OrderLineItem = require("../models/orderlineitem.model");
const Cart = require("../models/cart.model");

// function for generateOrdersID
const generateOrdersId = async () => {
    const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Format: YYYYMMDD
    const orderCount = await mongoose.model('Order').countDocuments({ orderDate: { $gte: new Date().setHours(0, 0, 0, 0) } });
    return `ORD-${datePart}-${String(orderCount + 1).padStart(3, '0')}`;
};

const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const selectedProductIds = req.body.selectedProducts;

    if (!selectedProductIds || selectedProductIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No products selected for checkout" });
    }

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Filter only selected products
    const selectedProducts = cart.products.filter((item) =>
      selectedProductIds.includes(item.product._id.toString())
    );

    if (selectedProducts.length === 0) {
      return res
        .status(400)
        .json({ message: "Selected products are not in the cart" });
    }

    // Calculate total price for selected items
    const totalPrice = selectedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderId = await generateOrdersId();
    const newOrder = new Order({
      _id: orderId,
      user: userId,
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

    await newOrder.save();

    const orderLineItems = await Promise.all(
      selectedProducts.map(async (item) => {
        const orderLineItem = new OrderLineItem({
          orderId: newOrder._id,
          product: item.product._id,
          quantity: item.quantity,
          subPrice: item.price * item.quantity,
        });
        await orderLineItem.save();
        return orderLineItem._id; // Store the ID
      })
    );

    await Order.findByIdAndUpdate(newOrder._id, { orderlineitems: orderLineItems });

    const remainingProducts = cart.products.filter(
      (item) => !selectedProductIds.includes(item.product._id.toString())
    );

    cart.products = remainingProducts;
    cart.totalPrice = remainingProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ status: "error", message: "Server Error", error: error.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const { user } = req;

    const orders = await Order.find({ user: user.id })
      .populate("orderlineitems")
      .lean();

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      userid: order.user,
      totalPrice: order.totalPrice,
      status: order.status,
      paymentMethod: order.paymentMethod,
      orderDate:  new Date(order.orderDate).toLocaleString(),
      shippingAddress: order.shippingAddress || null,
      courier: order.courier || null,
      items: order.orderlineitems.map((item) => ({
        id: item._id,
        product: item.product ? item.product.name : "Deleted Product",
        quantity: item.quantity,
        subPrice: item.subPrice,
      })),
    }));

    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: formattedOrders,
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

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const totalItems = await Order.countDocuments();
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
      path: "orderlineitems",
      populate: {
        path: "product",
        select: "name price",
      },
      })
      .select("_id user totalPrice status paymentMethod orderDate courier orderId isPaid")
      .skip(skip)
      .limit(parseInt(limit));

    if (!orders.length) {
      return res.status(404).json({ status: "error", message: "No orders found" });
    }

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      orderId: order.orderId,
      userId: order.user ? order.user._id : "Guest",
      user: order.user ? order.user.name : "Guest",
      email: order.user ? order.user.email : "-",
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      orderDate: new Date(order.orderDate).toLocaleString(),
      courier: order.courier ? order.courier.name : "Not Assigned",
      items: order.orderlineitems.map(item => ({
      productId: item.product ? item.product._id : "",
      productName: item.product ? item.product.name : "Deleted Product",
      productPrice: item.product ? item.product.price : 0,
      quantity: item.quantity,
      subPrice: item.subPrice,
      })),
    }));

    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalItems / limit),
      totalOrders: totalItems,
      data: formattedOrders,
    });

  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ status: "error", message: "Server Error", error: error.message });
  }
};

const getFilteredOrdersReport = async (req, res) => {
  try {
    const { month, year, startDate, endDate } = req.query;

    const filter = {};

    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59); // Akhir bulan
      filter.orderDate = { $gte: start, $lte: end };
    } else if (startDate && endDate) {
      // Rentang tanggal
      filter.orderDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (year) {
      // Tahun penuh
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      filter.orderDate = { $gte: start, $lte: end };
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate({
        path: "orderlineitems",
        populate: {
          path: "product",
          select: "name price",
        },
      })
      .select("_id user totalPrice status paymentMethod orderDate courier orderId isPaid");

    const formattedOrders = orders.map(order => ({
      orderId: order.orderId,
      user: order.user?.name || "Guest",
      email: order.user?.email || "-",
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      orderDate: new Date(order.orderDate).toLocaleString(),
      courier: order.courier?.name || "Not Assigned",
      items: order.orderlineitems.map(item => ({
        productName: item.product?.name || "Deleted Product",
        productPrice: item.product?.price || 0,
        quantity: item.quantity,
        subPrice: item.subPrice,
      })),
    }));

    res.status(200).json({
      status: "success",
      totalOrders: orders.length,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error getting filtered report:", error);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).lean();
    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  createOrderFromCart,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getFilteredOrdersReport
};
