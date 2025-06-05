const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/connection');

class Opname extends Model {
    static associate(models) {
        Opname.belongsTo(models.Product, { foreignKey: 'productId' });
    }
}

Opname.init(
    {
        opnameId: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Products',
                key: "productId"
            }
        },
        recordedStock : {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        physicalStock: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        
        difference: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        note: {
            type: DataTypes.TEXT,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "Opname",
        tableName: "Opname",
        timestamps: true,
    }
);

module.exports = Opname;