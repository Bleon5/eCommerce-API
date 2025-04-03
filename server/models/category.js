import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const DB_URL = process.env.DB_URL;

const sequelize = new Sequelize(DB_URL);

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

sequelize.sync();

export default Category;
