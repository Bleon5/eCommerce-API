import { Router } from "express";
import { getUsers,getOneUser,createUser,updateUser,deleteUser } from "../controllers/usersControllers.js";
import {validateAddUser,validateUpdateUser} from "../middleware/userValidation.js"

const userRouter = Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',getOneUser);
userRouter.post('/',validateAddUser,createUser);
userRouter.put('/:id',validateUpdateUser,updateUser);
userRouter.delete('/:id',deleteUser);

export default userRouter;