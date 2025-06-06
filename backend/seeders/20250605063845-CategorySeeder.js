'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {
        categoryId: "BG",
        name: "Bag",
        description: "ini adalah category sepatu",
        prefix: "BG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: "SH",
        name: "Shoes",
        description: "ini adalah category sepatu",
        prefix: "SH",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: "WL",
        name: "Wallet",
        description: "ini adalah category Dompet",
        prefix: "WL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: "WW",
        name: "Wrist Watch",
        description: "",
        prefix: "WW",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: "BL",
        name: "Bracelet",
        description: "",
        prefix: "BL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: "SG",
        name: "Sunglasses",
        description: "",
        prefix: "SG",
        createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        categoryId: "BC",
        name: "Bodycare",
        description: "",
        prefix: "BC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Categories')
  }
};
