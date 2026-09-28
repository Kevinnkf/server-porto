export default (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        url: { type: DataTypes.STRING, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        dateStarted: { type: DataTypes.DATE, allowNull: true },
        dateCompleted: { type: DataTypes.DATE, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: true },
    }, {
        tableName: 'projects',
        timestamps: true,
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Project;
};
