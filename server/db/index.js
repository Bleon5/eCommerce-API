import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const DB_URL = process.env.DB_URL;

export const sequelize = new Sequelize(DB_URL);