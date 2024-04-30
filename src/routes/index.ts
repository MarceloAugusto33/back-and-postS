import { Router } from "express";

// Routes
import { userRouter } from '../routes/user.routes';
import { postRouter } from "./post.routes";
import { sessionRouter } from "./session.routes";

const router = Router()

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/session', sessionRouter);


export { router };

