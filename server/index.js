import express from "express";
import { config } from "dotenv";
import cors from 'cors'
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productsRouter.js";
import errorResponse from "./utils/ErrorResponse.js";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello, from the server!"));

app.use("/category", categoryRouter);
app.use('/products',productRouter);

app.use('*',(req,res) => {
    res.status(404).json({error:'Page Not Found'})
})

app.use(errorResponse);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
