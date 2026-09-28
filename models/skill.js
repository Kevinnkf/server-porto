export default (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'skills',
    timestamps: true,
  });

  Skill.associate = (models) => {
    Skill.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Skill;
};
