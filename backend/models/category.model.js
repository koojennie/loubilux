const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../lib/connection"); 

class Category extends Model {
  static associate(models) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prefix: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories", 
    timestamps: true,
  }
);

module.exports = Category;
