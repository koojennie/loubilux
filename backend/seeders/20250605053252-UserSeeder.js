'use strict';
const bcrypt = require('bcryptjs');


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


    await queryInterface.bulkInsert('Users', [
      {
        userId: 'USR-0001', // ganti userId nya ke sesuai yang ada di database
        name: 'adminloubi',
        username: 'adminloubi',
        email: 'adminloubi@gmail.com',
        password: await bcrypt.hash("Admin.123", 10),
        phoneNumber: '08123456789',
        profilePicture: 'https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg',
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 'USR-0002 ',
        name: 'jennie', 
        username: 'jennie',
        email: 'jennie@gmail.com',
        password: await bcrypt.hash("Jennie.123", 10),
        phoneNumber: '08123456789',
        role: 'admin',
        profilePicture: 'https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 'USR-0003 ',
        name: 'userjennie', 
        username: 'userjennie',
        email: 'jennie@gmail.com',
        password: await bcrypt.hash("Jennie.123", 10),
        phoneNumber: '08123456789',
        role: 'user',
        profilePicture: 'https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg',
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
    //  * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', {
      email: ['adminloubi@gmail.com', 'jennie@gmail.com']
    });
  }
};
