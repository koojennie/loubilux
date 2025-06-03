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

    await queryInterface.createTable('Opname', {
      opnameId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'productId'
        }
      },
      recordedStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      physicalStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      difference: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      note: {
        type: Sequelize.TEXT
      },
       opnameDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('Opname');

  }
};
