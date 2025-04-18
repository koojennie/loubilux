const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Foreign key for Users
      key: 'id', // Foreign key
    },
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Establishing many-to-many relationship with products through CartProducts table
// Cart.belongsToMany(Product, { through: 'CartProduct', foreignKey: 'cartId' });
// Product.belongsToMany(Cart, { through: 'CartProduct', foreignKey: 'productId' });

module.exports = Cart;
