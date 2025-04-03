import { Router } from "express";
import categoryController from "../controllers/categories.js";
import { categoryValidate } from "../middleware/categoryMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", categoryValidate, categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
