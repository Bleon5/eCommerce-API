import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Order from "./Order.js";
import Product from "./Product.js";

const OrderProduct = sequelize.define('OrderProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 1 }
    }
}, {
    timestamps: false,
    tableName: 'order_products'
});

export default OrderProduct;