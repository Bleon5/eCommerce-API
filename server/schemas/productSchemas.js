import joi from 'joi';

export const addProductSchema= joi.object({
    name:joi.string().required().min(2),
    description:joi.string().required(),
    price:joi.number().precision(2).required(),
    categoryId:joi.number().integer().required()
});

export const updateProductSchema= joi.object({
    name:joi.string().optional().min(2),
    description:joi.string().optional(),
    price:joi.number().precision(2).optional(),
    categoryId:joi.number().integer().optional()
});