import express, { Request, Response } from 'express';
import userRouter from './users';
import postRouter from './posts';
import { serverError } from '../controllers';

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use(serverError);

export default router;
