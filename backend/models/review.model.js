const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const Review = sequelize.define('Review', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id',
    },
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    min: 1,
    max: 5,
  },
  comment: {
    type: DataTypes.STRING,
    maxLength: 500,
  },
}, {
  timestamps: true,
});

module.exports = Review;
