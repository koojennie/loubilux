const sequelize = require('../lib/connection');
const User = require('./user.models');
const Product = require('./product.model');
const Cart = require('./cart.model');
const Category = require('./category.model');
const Order = require('./order.model');
const OrderLineItem = require('./orderlineitem.model');
const Review = require('./review.model');
const CartProduct = require('./cartProduct.model')

// Relasi antar model
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderLineItem, { foreignKey: 'orderId' });
OrderLineItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderLineItem, { foreignKey: 'productId' });
OrderLineItem.belongsTo(Product, { foreignKey: 'productId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Relasi Many-to-Many Cart-Product melalui CartProduct
Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId' });


// EXPORT
module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Category,
  Order,
  OrderLineItem,
  Review,
  CartProduct,
};
