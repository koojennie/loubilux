const { DataTypes, Model, Sequelize } = require("sequelize");
const { sequelize } = require("../lib/connection"); 

class Category extends Model {
  static associate(models) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
  }
}

Category.init(
  {
    categoryId: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
    modelName: "Category",
    tableName: "Categories", 
    timestamps: true,
  }
);

module.exports = Category;
