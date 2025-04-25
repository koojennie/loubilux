const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../lib/connection"); // Adjust the path to your Sequelize instance

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: true,
        hooks: {
            beforeValidate: async (user) => {
                if (!user.userId) {
                    const lastUser = await User.findOne({
                        order: [["createdAt", "DESC"]],
                    });
                    const lastNumber = lastUser
                        ? parseInt(lastUser.userId.split("-")[1])
                        : 0;
                    user.userId = `USR-${String(lastNumber + 1).padStart(4, "0")}`;
                }
            },
        },
    }
);

module.exports = User;