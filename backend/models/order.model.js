const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Order extends Model {
  static associate(models) {
    // 1 Order belongs to 1 User
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    // 1 Order has many OrderLineItems
    Order.hasMany(models.OrderLineItem, { foreignKey: 'orderId', as: 'orderLineItems' });
    Order.belongsTo(models.Address, {
      foreignKey: 'shippingAddressId',
      as: 'shippingAddress',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}

Order.init(
  {
    orderId: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
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
    shippingAddressId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Addresses',
        key: 'addressId',
      },
    },
    courier: DataTypes.JSON,
    cancellationReason: DataTypes.STRING,
    orderDate: DataTypes.DATE,
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
