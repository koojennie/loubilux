const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Order extends Model {
  static associate(models) {
    // 1 Order belongs to 1 User
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    // 1 Order has many OrderLineItems
    Order.hasMany(models.OrderLineItem, { foreignKey: 'orderId', as: 'orderLineItems' });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Unpaid',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
    shippingAddress: DataTypes.JSON,
    courier: DataTypes.JSON,
    cancellationReason: DataTypes.STRING,
    // orderDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
  }
);

module.exports = Order;
