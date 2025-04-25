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
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      orderId: {
        type: Sequelize.DataTypes.String,
        unique: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: 'Unpaid',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending',
      },
      shippingAddress: {
        type: Sequelize.JSON,
      },
      courier: {
        type: Sequelize.JSON,
      },
      cancellationReason: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      orderDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Orders');
  }
};
