import Product from "./product.js"
import Category from "./category.js"
import User from "./User.js";
import Order from "./Order.js";
import OrderProduct from "./OrderProduct.js";


// User - Order (One-to-many)
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Order - Product (Many-to-Many) via OrderProduct
Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products'
});
Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'productId',
    otherKey: 'orderId',
    as: 'orders'
});

// Extra
Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'orderItems' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
Product.hasMany(OrderProduct, { foreignKey: 'productIdId', as: 'orderItems' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });

//product - category
Category.hasMany(Product,{foreignKey:'categoryId'});
Product.belongsTo(Category,{foreignKey:'categoryId'});

export { User, Product,Category, Order, OrderProduct };
