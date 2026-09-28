/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('users');

    if (!columns.createdAt) {
      await queryInterface.addColumn('users', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }

    if (!columns.updatedAt) {
      await queryInterface.addColumn('users', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'updatedAt');
    await queryInterface.removeColumn('users', 'createdAt');
  }
};
