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
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      orderId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      rating: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable('Reviews');
  }
};
