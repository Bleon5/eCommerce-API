import {User} from "../models/index.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getUsers = async(req,res,next) => {
    try {
        const users= await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}

export const getOneUser = async(req,res,next) => {
    try {
        const {id}=req.params;
        const user= await User.findByPk(id);
        res.status(200).json(user);
    } catch (error) {
        next(new ErrorResponse(error.message,500));
    }
}

export const createUser = async(req,res,next) => {
    try {
        const {name,email,password}=req.body;
        const newUser=await User.create({name,email,password});
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error)
        next(new ErrorResponse(error.message,500));
    }
}

