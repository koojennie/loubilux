const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Cart extends Model {
  static associate(models) {
    // 1 Cart has many CartItems
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'cartItems' });
  }
}

Cart.init({
  cartId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    }
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'Carts',
  timestamps: true,
});

module.exports = Cart;
