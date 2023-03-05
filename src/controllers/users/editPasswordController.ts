import { Request, Response, NextFunction } from 'express';
import { editPasswordQuery } from '../../database';
import bcrypt from 'bcrypt';
import { CustomError, verifyToken, resetPasswordSchema } from '../../utils';
import { config } from 'dotenv';

config();

interface RequestWithResetPasswordAccsess extends Request {
  resetPasswordAccsess?: boolean;
}

const editPasswordController = async (
  req: RequestWithResetPasswordAccsess,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    const { id } = (await verifyToken(token)) as { id: number; email: string };
    const { password, confirmPassword } = req.body;

    if (req.resetPasswordAccsess !== true) {
      throw new CustomError('You are not allowed to do this', 401);
    }

    await resetPasswordSchema.validateAsync({ password, confirmPassword });
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    await editPasswordQuery({ id, password: hashedPassword });
    res.status(200).json({
      error: false,
      data: {
        message: 'Password updated successfully',
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editPasswordController;
