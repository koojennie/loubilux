const mongoose = require("mongoose");
const Order = require("../models/order.models");
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
        const orders = await Order.find()
            .populate("user", "name email")
            .select("_id user totalPrice status paymentMethod orderDate courier orderId isPaid");

        if (!orders.length) {
            return res.status(404).json({ status: "error", message: "No orders found" });
        };

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            orderId: order.orderId,
            user: order.user ? order.user.name : "Guest",
            email: order.user ? order.user.email : "-",
            totalPrice: order.totalPrice,
            statusOrder: order.status,
            isPaid: order.isPaid,
            paymentMethod: order.paymentMethod,
            orderDate: new Date(order.orderDate).toLocaleString(),
            courier: order.courier ? order.courier.name : "Not Assigned",
        }));

        res.status(200).json({
            status: "success",
            message: "Orders retrieved successfully",
            data: formattedOrders,
        });

    } catch (error) {
        console.error("Error retrieving orders:", error);
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
};
