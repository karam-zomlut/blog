import express, { Request, Response } from 'express';
import {
  logoutController,
  signinController,
  signupController,
} from '../controllers';

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/signin', signinController);
userRouter.delete('/logout', logoutController);

export default userRouter;
