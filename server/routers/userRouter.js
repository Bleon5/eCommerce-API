import { Router } from "express";
import { getUsers,getOneUser,createUser } from "../controllers/usersControllers.js";
import {validateAddUser} from "../middleware/userValidation.js"

const userRouter = Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',getOneUser);
userRouter.post('/',validateAddUser,createUser);

export default userRouter;