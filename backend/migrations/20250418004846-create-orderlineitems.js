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
    await queryInterface.createTable('OrderLineItems', {
      orderLineId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull:false,
      },
      orderId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'orderId',
        },
      },
      productId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'productId',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('OrderLineItems');
  }
};
