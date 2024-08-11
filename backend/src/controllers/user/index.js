import { Router } from 'express';
import { signUp } from './signUp';

const userRouter = Router();

userRouter.post("/signUp", signUp);

export { userRouter };
