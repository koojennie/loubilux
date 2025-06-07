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
    await queryInterface.bulkInsert('Products', [
      {
        productId: "BG-00002",
        name: "Coach Mollie Tote Bag in Signature Canvas",
        quantity: 5,
        price: 3190000,
        images: ['/img/featured-item1.png'],
        description: 'Coach Mollie Tote Bag In Signature Canvas',
        statusPublish: 'draf',
        categoryId: 'BG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: "BG-00003",
        name: "Michael Kors Crossbody",
        quantity: 10,
        price: 1290000,
        images: ['/img/featured-item2.png'],
        description: 'ini',
        statusPublish: 'draf',
        categoryId: 'BG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: "WW-00001",
        name: "Lacoste Geneva 2001138",
        quantity: 20,
        price: 1950000,
        images: ['/img/featured-item3.png'],
        description: 'ini',
        statusPublish: 'draf',
        categoryId: 'WW',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: "SG-00001",
        name: "Longchamp Sunglasses",
        quantity: 25,
        price: 1350000,
        images: ['/img/featured-item4.png'],
        description: 'ini',
        statusPublish: 'draf',
        categoryId: 'SG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', {
      productId: ['BG-00002', 'BG-00003', 'WW-00001', 'SG-00001'],
    })
  }
};
