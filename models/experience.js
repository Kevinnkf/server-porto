export default (sequelize, DataTypes) => {
    const Experiences = sequelize.define('Experiences', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        company: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true },
        startDate: { type: DataTypes.DATE, allowNull: true },
        endDate: { type: DataTypes.DATE, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: true },
    }, {
        tableName: 'experiences',
        timestamps: true,
    });

    Experiences.associate = (models) => {
        Experiences.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Experiences;
};
