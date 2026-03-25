import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Summary extends Model {
        static associate(models) {
            Summary.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    Summary.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        content: { type: DataTypes.TEXT, allowNull: true },
    }, {
        sequelize,
        modelName: 'Summary',
        tableName: 'summaries'
    });
    return Summary;
}