export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: {
                isEmail: true
            }
        },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        profession: { type: DataTypes.STRING, allowNull: true },
        summary: { type: DataTypes.TEXT, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' }
    }, {
        tableName: 'users',
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Project, { foreignKey: 'userId', as: 'projects' });
        User.hasMany(models.Experiences, { foreignKey: 'userId', as: 'experiences' });
        User.hasMany(models.Skill, { foreignKey: 'userId', as: 'skills' });
    };

    return User;
};
