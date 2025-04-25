const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class OrderLineItem extends Model {
  static associate(models) {
    // 1 OrderLineItem belongs to 1 Order
    OrderLineItem.belongsTo(models.Order, { foreignKey: 'orderId'});
    // 1 OrderLineItem belongs to 1 Product
    OrderLineItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

OrderLineItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
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
    },
    subPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'OrderLineItem',
    tableName: 'OrderLineItems',
    timestamps: true,
  }
);

module.exports = OrderLineItem;
