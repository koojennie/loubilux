const { Op, where } = require("sequelize");
const { Order, User, OrderLineItem, Product, Cart, CartItem, Category, sequelize, Sequelize } = require("../models");

const formatTimestamp = (date) => {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta", // Atur sesuai waktu lokal yang ingin dipakai
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).replace(/:/g, '.');
};


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

const generateOrderLineItemsId = async () => {
  const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const count = await OrderLineItem.count({ where: { createdAt: { [Op.gte]: new Date().setHours(0, 0, 0, 0) } } });
  const sequence = String(count + 1).padStart(3, '0');
  return `OLI-${datePart}-${sequence}`;
};

const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const selectedProductIds = req.body.selectedProducts;
    const shippingAddressId = req.body.shippingAddressId;

    if (!selectedProductIds?.length) {
      return res.status(400).json({ message: "No products selected for checkout" });
    }

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        as: "cartItems",
        include: {
          model: Product,
          as: "product"
        }
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

    // Calculate total price
    const totalPrice = selectedItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    // Generate order ID
    const orderId = await generateOrdersId();

    // Create the order
    const newOrder = await Order.create({
      orderId,
      userId,
      totalPrice,
      status: "Pending",
      orderDate: new Date(),
      paymentMethod: req.body.paymentMethod || "COD",
      shippingAddressId: shippingAddressId, // use FK if related
    });

    // Create OrderLineItems
    for (const item of selectedItems) {
      const orderLineItemId = await generateOrderLineItemsId(); // Make sure it’s unique each time

      await OrderLineItem.create({
        orderLineId: orderLineItemId,
        orderId: newOrder.orderId,
        productId: item.productId,
        quantity: item.quantity,
        subPrice: item.product.price * item.quantity,
      });
    }

    // Remove the selected items from cart
    await CartItem.destroy({
      where: {
        cartId: cart.cartId,
        productId: selectedProductIds,
      },
    });

    // Update cart total to reflect removed items
    const remainingCartItems = await CartItem.findAll({
      where: { cartId: cart.cartId },
      include: {
        model: Product,
        as: "product"
      }
    });
    cart.totalPrice = remainingCartItems.reduce((sum, item) => {
      return sum + (item.product ? item.product.price * item.quantity : 0);
    }, 0);
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ status: "error", message: "Server Error", error: error.message });
  }
};


const getUserOrders = async (req, res) => {
  const { user } = req;

  try {
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "name", "email"],
        },
        {
          model: OrderLineItem,
          as: "orderLineItems",
          include: {
            model: Product,
            as: "product",
            attributes: ["productId", "name", "price"]
          },
        },
      ],
    });

    // Calculate total spent by the user
    const totalSpent = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const data = orders.map(order => ({
      orderId: order.orderId,
      userId: order.userId,
      totalSpent: totalSpent,
      user: order.user?.name,
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      paymentMethod: order.paymentMethod,
      orderDate: formatTimestamp(order.createdAt),
      shippingAddress: order.shippingAddress,
      courier: order.courier,
      items: order.orderLineItems.map(item => ({
        id: item.id,
        product: item.product?.name || "Deleted Product",
        quantity: item.quantity,
        subPrice: item.subPrice,
        category: item.product?.category || "Category Not"
      })),
    }));

    // Attach totalSpent to the response
    res.status(200).json({ status: "success", message: "Orders retrieved", data });


  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = "createdAt", sortOrder, searchQuery } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    sortOrder = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";

    const offset = (page - 1) * limit;

    const where = {};
    if (searchQuery) {
      where[Op.or] = [
        { orderId: { [Op.like]: `%${searchQuery}%` } },
        { "$user.name$": { [Op.like]: `%${searchQuery}%` } },
      ];
    }

    const totalOrders = await Order.count();

    const { rows: orders } = await Order.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [[sortBy, sortOrder]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "name", "email"],
        },
        {
          model: OrderLineItem,
          as: "orderLineItems",
          include: {
            model: Product,
            as: "product",
            attributes: ["productId", "name", "price"]
          },
        },
      ],
    });

    const data = orders.map(order => ({
      orderId: order.orderId,
      userId: order.userId,
      user: order.user?.name,
      email: order.user?.email,
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      status: order.status,
      paymentMethod: order.paymentMethod,
      orderDate: formatTimestamp(order.createdAt),
      courier: order.courier?.name || "Not Assigned",
      items: order.orderLineItems.map(item => ({
        productId: item.productId || "",
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

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ status: "error", message: "Order ID is required" });
    }

    const order = await Order.findOne({
      where: { orderId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "name", "email"],
        },
        {
          model: OrderLineItem,
          as: "orderLineItems",
          include: {
            model: Product,
            as: "product",
            attributes: ["productId", "name", "price", "images"],
            include: {
              model: Category,
              as: "Category",
              attributes: ["name"],
            },
          },
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    const data = {
      orderId: order.orderId,
      user: {
        name: order.user?.name,
        email: order.user?.email,
      },
      totalPrice: order.totalPrice,
      statusOrder: order.status,
      isPaid: order.isPaid,
      paymentMethod: order.paymentMethod,
      orderDate: formatTimestamp(order.createdAt),
      courier: order.courier?.name || "Not Assigned",
      items: order.orderLineItems.map((item) => ({
        productId: item.productId || "",
        name: item.product?.name || "Deleted Product",
        price: item.product?.price || 0,
        quantity: item.quantity,
        subPrice: item.subPrice,
        images: item.product?.images || [],
        category: item.product.Category.name
      })),
    };

    res.status(200).json({
      status: "success",
      message: "Order retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
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
      orderDate: formatTimestamp(order.createdAt),
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
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ status: "error", message: "Invalid order status" });
    }

    const order = await Order.findOne({ where: { orderId } });
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

const getMontlyRevenue = async (req, res) => {
  try {

    const montlyRevenueData = await sequelize.query(`
        SELECT 
        TO_CHAR("createdAt", 'YYYY-MM') AS month,
        SUM("totalPrice") AS totalRevenue
        FROM "Orders"
        GROUP BY month
        ORDER BY month ASC;
      `, {
      type: Sequelize.QueryTypes.SELECT
    });

    res.status(200).json({
      status: 'success',
      message: 'Montly Revenue Success',
      data: montlyRevenueData
    });


  } catch (error) {
    console.error('Error getMontlyRevenue', error);
    res.status(500).json({
      status: 'error',
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

const getRevenueByCategory = async (req, res) => {
  try {
    const results = await OrderLineItem.findAll({
      attributes: [
        [Sequelize.col('product.Category.name'), 'categoryName'],
        [Sequelize.fn('SUM', Sequelize.col('subPrice')), 'totalRevenue']
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [],
          include: [
            {
              model: Category,
              as: 'Category',
              attributes: [],
            },
          ],
        },
      ],
      group: ['product.categoryId', 'product.Category.name'],
      order: [[Sequelize.fn('SUM', Sequelize.col('subPrice')), 'DESC']],
      raw: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Revenue by category retrieved successfully',
      data: results,
    });
  } catch (error) {
    console.error('Error getRevenueByCategory:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updateFields = req.body;

    if (!orderId) {
      return res.status(400).json({ status: "error", message: "Order ID is required" });
    }

    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    // Only allow certain fields to be updated
    const allowedFields = [
      "status",
      "shippingAddressId",
    ];
    for (const key of Object.keys(updateFields)) {
      if (allowedFields.includes(key)) {
        order[key] = updateFields[key];
      }
    }

    await order.save();

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
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
  getOrderById,
  updateOrderStatus,
  getFilteredOrdersReport,
  getMontlyRevenue,
  getRevenueByCategory,
};
