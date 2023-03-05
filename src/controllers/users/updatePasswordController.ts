import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  sendEmail,
  updatePasswordSchema,
  verifyToken,
} from '../../utils';
import bcrypt from 'bcrypt';
import { editPasswordQuery, checkEmailQuery } from '../../database';

interface RequsetWithBody extends Request {
  body: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  };
  user?: {
    id: number;
    email: string;
    username: string;
    verified: boolean;
  };
}

const updatePasswordController = async (
  req: RequsetWithBody,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError('Unauthorized', 401);
    }
    const { id, email, username } = req.user;
    const { oldPassword, password, confirmPassword } = req.body;

    await updatePasswordSchema.validateAsync({
      oldPassword,
      password,
      confirmPassword,
    });

    const { rows } = await checkEmailQuery({ email });

    if (!rows.length) {
      throw new CustomError('Unauthorized', 401);
    }

    const { password: hashedPasswordFromDB } = rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      hashedPasswordFromDB
    );

    if (!isPasswordCorrect) {
      throw new CustomError('Password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    await editPasswordQuery({ id, password: hashedPassword });

    await sendEmail(
      email,
      'Password updated successfully',
      'You are receiving this email because you have updated your password. If you did not update your password, please contact us immediately'
    );

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

export default updatePasswordController;
