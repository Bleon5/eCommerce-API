import { Router } from "express";
import { getProducts,getOneProduct,createProduct,updateProduct,deleteProduct } from "../controllers/productsControllers.js";
import {validateAddProduct,validateUpdateProduct} from "../middleware/productValidationMiddleware.js"

const productRouter = Router();

productRouter.get('/',getProducts);
productRouter.get('/:id',getOneProduct);
productRouter.post('/',validateAddProduct,createProduct);
productRouter.put('/:id',validateUpdateProduct,updateProduct);
productRouter.delete('/:id',deleteProduct);

export default productRouter;