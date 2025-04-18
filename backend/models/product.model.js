const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  statusPublish: {
    type: DataTypes.STRING,
    enum: ['active', 'draft'],
    defaultValue: 'draft',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', 
      key: 'id', 
    },
  },
}, {
  timestamps: true,
});

module.exports = Product;
