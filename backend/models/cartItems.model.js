const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class CartItem extends Model {
  static associate(models) {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
    // CartItem belongs to Product
    CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

CartItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'CartItem',
  tableName: 'CartItems',
  timestamps: true,
});

module.exports = CartItem;
