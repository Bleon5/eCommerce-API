import { Router } from "express";
import { getProducts,getOneProduct,createProduct,updateProduct,deleteProduct } from "../controllers/productsControllers.js";

const productRouter = Router();

productRouter.get('/',getProducts);
productRouter.get('/:id',getOneProduct);
productRouter.post('/',createProduct);
productRouter.put('/:id',updateProduct);
productRouter.delete('/:id',deleteProduct);

export default productRouter;