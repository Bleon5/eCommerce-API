import Joi from 'joi';

export const createOrderSchema = Joi.object({
    userId: Joi.number().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.number().required(),
            quantity: Joi.number().min(1).required()
        })
    ).required()
});

export const updateOrderSchema = Joi.object({
    userId: Joi.number().optional(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.number().required(),
            quantity: Joi.number().min(1).required()
        })
    ).optional()
});