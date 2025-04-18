const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', 
      key: 'id', 
    },
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    min: 0,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    enum: ['COD', 'Credit Card', 'Bank Transfer', 'E-Wallet'],
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    enum: ['Unpaid', 'Pending', 'Paid', 'Failed', 'Refunded'],
    defaultValue: 'Unpaid',
  },
  status: {
    type: DataTypes.STRING,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    defaultValue: 'Pending',
  },
  shippingAddress: {
    type: DataTypes.JSON,
  },
  courier: {
    type: DataTypes.JSON,
  },
  cancellationReason: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
}, {
  timestamps: true,
});

Order.beforeValidate(async (order, options) => {
  if (!order.orderId) {
    const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); 
    const orderCount = await Order.count({
      where: {
        orderDate: {
          [Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0),
        },
      },
    });
    order.orderId = `ORD-${datePart}-${String(orderCount + 1).padStart(3, '0')}`;
  }
});

module.exports = Order;
