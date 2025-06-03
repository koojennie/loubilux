const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class OrderLineItem extends Model {
  static associate(models) {
    // 1 OrderLineItem belongs to 1 Order
    OrderLineItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    // 1 OrderLineItem belongs to 1 Product
    OrderLineItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

OrderLineItem.init(
  {
    orderLineId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Orders",
        key: "orderId"
      }
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Products',
        key: "productId"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'OrderLineItem',
    tableName: 'OrderLineItems',
    timestamps: true,
  }
);

module.exports = OrderLineItem;
