const { DataTypes, Model, Sequelize } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Address extends Model {
  static associate(models) {
    Address.hasOne(models.Order, {
      foreignKey: 'shippingAddressId',
      as: 'order',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}

Address.init( 
  {
    addressId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      }
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'Adresses',
    timestamps: true,
  }
);

module.exports = Address;
