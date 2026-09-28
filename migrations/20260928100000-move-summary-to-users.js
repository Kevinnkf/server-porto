/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const tables = (await queryInterface.showAllTables()).map((table) =>
      typeof table === 'string' ? table : table.tableName
    );
    const users = await queryInterface.describeTable('users');

    if (!users.profession) {
      await queryInterface.addColumn('users', 'profession', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!users.summary) {
      await queryInterface.addColumn('users', 'summary', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    if (tables.includes('summaries')) {
      const summaryColumns = await queryInterface.describeTable('summaries');
      if (summaryColumns.userId) {
        const [summaries] = await queryInterface.sequelize.query(`
          SELECT DISTINCT ON ("userId") "userId", content
          FROM summaries
          WHERE "userId" IS NOT NULL AND content IS NOT NULL
          ORDER BY "userId", "createdAt" DESC NULLS LAST, id DESC
        `);

        for (const summary of summaries) {
          await queryInterface.bulkUpdate(
            'users',
            { summary: summary.content },
            { id: summary.userId }
          );
        }
      }

      if (tables.includes('summaries_legacy')) {
        throw new Error('summaries_legacy already exists; refusing to overwrite archived summary data.');
      }
      await queryInterface.renameTable('summaries', 'summaries_legacy');
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = (await queryInterface.showAllTables()).map((table) =>
      typeof table === 'string' ? table : table.tableName
    );

    if (tables.includes('summaries_legacy') && !tables.includes('summaries')) {
      await queryInterface.renameTable('summaries_legacy', 'summaries');
    }

    const users = await queryInterface.describeTable('users');
    if (users.summary) {
      await queryInterface.removeColumn('users', 'summary');
    }
    if (users.profession) {
      await queryInterface.removeColumn('users', 'profession');
    }
  }
};
