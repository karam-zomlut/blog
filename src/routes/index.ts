import express, { Request, Response } from 'express';
import userRouter from './users';
import postRouter from './posts';
import { serverError } from '../controllers';
import imageRouter from './images';

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/images', imageRouter);
router.use(serverError);

export default router;
