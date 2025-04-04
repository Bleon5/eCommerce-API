import express from "express";
import { Sequelize } from "sequelize";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
