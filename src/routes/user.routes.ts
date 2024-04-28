import { Router } from "express";
import { UserController } from '../controllers/UserController';
import { authMiddleware } from "../middlewares/auth";


const userRouter = Router()
const userController = new UserController();

userRouter.get('/:username', userController.getByUsername);
userRouter.post("/", userController.createUser);
userRouter.put('/', authMiddleware, userController.updateUser);


export { userRouter }


