import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";


const postRouter = Router();

const postController = new PostController();

postRouter.get('/', postController.getAllPost);
postRouter.post('/', authMiddleware, postController.createPost);

export { postRouter }
