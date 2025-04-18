const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const OrderLineItem = sequelize.define('OrderLineItem', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Orders', 
      key: 'id', 
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', 
      key: 'id', 
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  subPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = OrderLineItem;
