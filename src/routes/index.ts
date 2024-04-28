import { Router } from "express";

import { userRouter } from '../routes/user.routes';
import { sessionRouter } from "./session.routes";

const router = Router()

router.use('/user', userRouter)
router.use('/session', sessionRouter)


export { router }

