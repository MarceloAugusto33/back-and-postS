import { Router } from "express";
import { UserController } from '../controllers/UserController';


const userRouter = Router()
const userController = new UserController();

userRouter.get('/:username', userController.getByUsername);
userRouter.post("/", userController.createUser);


export { userRouter }


