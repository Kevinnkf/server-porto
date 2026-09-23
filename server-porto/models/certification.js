import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Certification extends Model {
        static associate(models) {
            Certification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        }
    }
    Certification.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        issuer: { type: DataTypes.STRING, allowNull: false },
        issueDate: { type: DataTypes.STRING, allowNull: true },
        expirationDate: { type: DataTypes.STRING, allowNull: true },
        credentialId: { type: DataTypes.STRING, allowNull: true },
        credentialUrl: { type: DataTypes.STRING, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: true }
    }, {
        sequelize,
        modelName: 'Certification',
        tableName: 'certifications',
    });
    return Certification;
};
