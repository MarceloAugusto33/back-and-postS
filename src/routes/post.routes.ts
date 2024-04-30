import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";


const postRouter = Router();

const postController = new PostController();

postRouter.get('/', postController.getAllPost);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', authMiddleware, postController.createPost);
postRouter.put('/:id', authMiddleware, postController.updatePost);
postRouter.delete('/:id', authMiddleware, postController.deletePost);

export { postRouter };
