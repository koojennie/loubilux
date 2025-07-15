'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Orders', {
      orderId: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
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
      shippingAddressId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Adresses',
          key: 'addressId'
        },
        onDelete: 'SET NULL',   // atau 'CASCADE' / 'RESTRICT' tergantung tujuan kamu
        onUpdate: 'CASCADE'
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Orders');
  }
};
