'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('CartItems', {
      cartItemId: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false

      },
      cartId: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: 'Carts',
          key: 'cartId',
        },
      },
      productId: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: 'Products',
          key: 'productId',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      subPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('CartItems');
  }
};
