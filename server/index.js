import express from "express";
import { config } from "dotenv";
import { Sequelize } from "sequelize";
import categoryRouter from "./routers/categoryRouter.js";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello, from the server!"));

app.use("/category", categoryRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
