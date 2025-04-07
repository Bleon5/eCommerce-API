import Product from "../models/product.js";
import Category from "../models/category.js"


Category.hasMany(Product,{foreignKey:'categoryId'});
Product.belongsTo(Category,{foreignKey:'categoryId'});

export {Product,Category};