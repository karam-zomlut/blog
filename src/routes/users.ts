import express from 'express';
import {
  logoutController,
  signinController,
  signupController,
  verifyAccountController,
  requestVerifyAccountController
} from '../controllers';

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/signin', signinController);
userRouter.delete('/logout', logoutController);
userRouter.get('/verify', verifyAccountController);
userRouter.post('/request-verify', requestVerifyAccountController);

export default userRouter;
