import joi from 'joi';

export const addUserSchema= joi.object({
    name:joi.string().required().min(3).max(50),
    email:joi.string().email().required(),
    password:joi.string().required().min(6).max(50)
});

export const updateUserSchema= joi.object({
    name:joi.string().optional().min(3).max(50),
    email:joi.string().email().optional(),
    password:joi.string().optional().min(6).max(50)
});