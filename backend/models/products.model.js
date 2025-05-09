const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Product extends Model {
  static associate(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  }
}

Product.init(
  {
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    statusPublish: {
      type: DataTypes.STRING,
      defaultValue: 'draft',
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'categoryId',
      },
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
    modelName: "Product",
    tableName: "Products",
    timestamps: true,
  }
);

module.exports = Product;
