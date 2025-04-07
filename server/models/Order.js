import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import User from "./User.js";

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    timestamps: true,
    tableName: 'orders'
});

export default Order;