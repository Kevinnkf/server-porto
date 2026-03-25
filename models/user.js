import { Model, DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Project, { foreignKey: 'userId', as: 'projects' });
            User.hasMany(models.Experiences, { foreignKey: 'userId', as: 'experiences' });
            User.hasMany(models.Summary, { foreignKey: 'userId', as: 'summaries' });
            User.hasMany(models.Skill, { foreignKey: 'userId', as: 'skills' });
        }
    }
    User.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: {
                isEmail: true
            }
        },
        password: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User
}