import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            Project.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    Project.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        url: { type: DataTypes.STRING, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        dateStarted: { type: DataTypes.DATE, allowNull: true },
        dateCompleted: { type: DataTypes.DATE, allowNull: true },

    },
        {
            sequelize,
            modelName: 'Project',
            tableName: 'projects',
        });
    return Project;
}