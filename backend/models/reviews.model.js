const { Model, DataTypes } = require('sequelize');

'use strict';

module.exports = (sequelize) => {
    class Review extends Model {
        static associate(models) {
            // Define associations here
            Review.belongsTo(models.User, { foreignKey: 'userId' });
            Review.belongsTo(models.Product, { foreignKey: 'productId' });
            Review.belongsTo(models.Order, { foreignKey: 'orderId' });
        }
    }

    Review.init(
        {
            reviewId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            productId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            orderId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            comment: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Review',
            tableName: 'Reviews',
            timestamps: true,
        }
    );

    return Review;
};