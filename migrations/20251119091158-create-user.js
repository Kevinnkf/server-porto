'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {type: Sequelize.INTEGER, primaryKey: true,autoIncrement:true, allowNull: false, },
      username: {type: Sequelize.TEXT, allowNull: false, unique: true},
      email: {type: Sequelize.TEXT, allowNull: false, unique: true},
      password: {type: Sequelize.TEXT, allowNull: false},
      name: {type: Sequelize.TEXT, allowNull: false},

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
