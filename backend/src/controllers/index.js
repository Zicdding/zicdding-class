import express from 'express';
import { userRouter } from './user';

const apiRouter = express.Router();

apiRouter.use('/api/v1/users', userRouter);

export { apiRouter };

