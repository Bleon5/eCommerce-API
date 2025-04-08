import express from "express";
import { config } from "dotenv";
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productsRouter.js";
import orderRouter from './routers/orderRouter.js';
import userRouter from "./routers/userRouter.js";
import errorHandler from "./middleware/errorHandler.js";

config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello, from the server!"));

app.use("/category", categoryRouter);
app.use('/products',productRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.use((req,res) => {
    res.status(404).json({error:'Page Not Found'})
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
