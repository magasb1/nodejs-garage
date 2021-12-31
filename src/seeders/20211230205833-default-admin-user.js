'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync("Password123", 8),
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('userroles', [{
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      userId: 1,
      roleId: 2
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('userroles', null, {});
  }
};
