'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', {
      id: {type: Sequelize.INTEGER, primaryKey: true,autoIncrement:true, allowNull: false, },
      username: {type: Sequelize.TEXT, allowNull: false, unique: true},
      email: {type: Sequelize.TEXT, allowNull: false, unique: true},
      password: {type: Sequelize.TEXT, allowNull: false},
      name: {type: Sequelize.TEXT, allowNull: false},

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
