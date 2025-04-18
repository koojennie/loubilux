const { DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');
const Cart = require('./cart.model');
const Product = require('./product.model');

const CartProduct = sequelize.define('CartProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Tabel CartProduct menghubungkan Cart dan Product dengan foreign key
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });




module.exports = CartProduct;
