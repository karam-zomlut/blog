import { Request, Response, NextFunction } from 'express';
import { checkEmailQuery } from '../../database';
import { generatePasswordResetEmail, sendEmail, signToken, verifyToken } from '../../utils';

const requestPasswordResetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    const { email } = (await verifyToken(token)) as { email: string };

    const { rows } = await checkEmailQuery({ email });

    if (rows.length) {
      const { id, email } = rows[0];
      const passwordResetToken = await signToken(
        {
          id,
          email
        },
        {
          expiresIn: '2m',
        }
      );

      const url = `${process.env.CLIENT_URL}/users/edit-password?token=${passwordResetToken}`;
      await sendEmail(email, 'Password Reset', generatePasswordResetEmail(url));

      res.status(200).json({
        error: false,
        data: {
          message: 'Password reset email sent',
          url,
          user: {
            id,
            email,
          },
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export default requestPasswordResetController;