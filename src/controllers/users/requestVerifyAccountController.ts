import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  sendEmail,
  signToken,
  verifyAccountEmail,
  verifyToken
} from '../../utils';
import { config } from 'dotenv';

config();

const requestVerifyAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    const { id, email, username } = (await verifyToken(token)) as {
      id: number;
      email: string;
      username: string;
    };

    if (id) {
      const verifyAccountToken = await signToken(
        {
          id,
        },
        {
          expiresIn: '2m',
        }
      );

      const url = `${process.env.CLIENT_URL}/users/verify?token=${verifyAccountToken}`;
      await sendEmail(
        email,
        'Please verify your account',
        verifyAccountEmail(username, url)
      );

      res.status(200).json({
        error: false,
        data: {
          message: 'Verification email sent',
          user: {
            id,
            email,
          },
        },
      });
    } else {
      throw new CustomError('User not found', 404);
    }
  } catch (err) {
    next(err);
  }
};

export default requestVerifyAccountController;
