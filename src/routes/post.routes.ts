import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";


export const postRouter = Router();

const postController = new PostController();

postRouter.post('/', authMiddleware, postController.createPost)
