import express from 'express';
import {
  logoutController,
  signinController,
  signupController,
  verifyAccountController,
  requestVerifyAccountController,
  requestPasswordResetController,
  editPasswordController,
  updatePasswordController,
} from '../controllers';
import { checkAuth, checkResetPasswordAccess } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/signin', signinController);
userRouter.delete('/logout', logoutController);
userRouter.get('/verify', verifyAccountController);
userRouter.post('/request-verify', requestVerifyAccountController);
userRouter.post('/request-password-reset', requestPasswordResetController);
userRouter.post('/edit-password', checkResetPasswordAccess, editPasswordController);
userRouter.post('/update-password', checkAuth, updatePasswordController);

export default userRouter;
