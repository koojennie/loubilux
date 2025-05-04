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
  cartItemId: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Carts",
      key: "cartId"
    }
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'productId',
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  subPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
  modelName: 'CartItem',
  tableName: 'CartItems',
  timestamps: true,
});

module.exports = CartItem;
