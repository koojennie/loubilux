const { DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  prefix: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
}, {
  timestamps: true,
});

module.exports = Category;
