import {Category, Product} from "../db/index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getProducts = async(req,res,next) => {
    try {
        const products= await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}

export const getOneProduct = async(req,res,next) => {
    try {
        const {id}=req.params;
        const product= await Product.findByPk(id);
        res.status(200).json(product);
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}

export const createProduct = async(req,res,next) => {
    try {
        const {name,description,price,categoryId}=req.body;
        const category=await Category.findByPk(categoryId);
        if(!category)
            return next(new ErrorResponse('Category does not exist',400));

        const newProduct=await Product.create({name,description,price,categoryId});
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error)
        next(new ErrorResponse(error.message,500));
    }
}

export const updateProduct = async(req,res,next) => {
    try {
        const {id}=req.params;
        const {name,description,price,categoryId}=req.body;
        await Product.update({name,description,price,categoryId},{where:{id}});
        const updatedProduct=await Product.findByPk(id);
        res.json(updatedProduct);
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}

export const deleteProduct = async(req,res,next) => {
    try {
        const {id} = req.params;
        const products= await Product.destroy({where:{id}});
        res.status(200).send('product deleted successfully');
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}