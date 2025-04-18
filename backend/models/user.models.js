const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../lib/connection');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin', 'superadmin']],
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

// Auto-generate userId before save if not provided
User.beforeValidate(async (user, options) => {
  if (!user.userId) {
    const lastUser = await User.findOne({
      order: [['createdAt', 'DESC']],
    });
    const lastNumber = lastUser ? parseInt(lastUser.userId.split('-')[1]) : 0;
    user.userId = `USR-${String(lastNumber + 1).padStart(4, '0')}`;
  }
});

module.exports = User;
