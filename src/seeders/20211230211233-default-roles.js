'use strict';

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

     await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: "user",
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    },
    {
      id: 2,
      name: "admin",
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }], {});
},
    

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', [{
      id: 1,
      name: "user"
    },
    {
      id: 2,
      name: "admin"
    }], {});
  }
};
