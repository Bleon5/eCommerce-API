import Category from "../models/category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

class categoryController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      if (!categories)
        return next(new ErrorResponse("No categories found", 400));
      res.status(200).json(categories);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return next(new ErrorResponse("Category not found", 404));
      res.status(200).json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category)
        return next(new ErrorResponse("Category not found !", 400));
      await category.update({ name });
      res.json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) return next(new ErrorResponse("Name is required", 400));
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return next(new ErrorResponse("Category not found", 404));
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(new ErrorResponse(error.message, 500));
    }
  }
}

export default new categoryController();
