const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Cart extends Model {
  static associate(models) {
    // 1 Cart has many CartItems
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'cartItems' });
  }
}

Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'Carts',
  timestamps: true,
});

module.exports = Cart;
