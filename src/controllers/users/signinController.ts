import { checkEmailQuery } from '../../database';
import { signToken, CustomError, signinSchema } from '../../utils';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

type RequestWithBody = Request & {
  body: {
    email: string;
    password: string;
  };
};

const signinController = async (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    await signinSchema.validateAsync({ email, password });
    const { rows } = await checkEmailQuery({ email });
    if (!rows.length) {
      throw new CustomError('Invalid email or password', 400);
    }
    const isPasswordCorrect = await bcrypt.compare(password, rows[0].password);
    if (!isPasswordCorrect) {
      throw new CustomError('Invalid email or password', 400);
    }
    const token = await signToken(
      {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
      },
      {
        expiresIn: '1d',
      }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      })
      .status(200)
      .json({
        error: false,
        data: {
          message: 'Signin successful',
          user: {
            id: rows[0].id,
            username: rows[0].username,
            email: rows[0].email,
          },
        },
      });
  } catch (error) {
    next(error);
  }
};

export default signinController;
