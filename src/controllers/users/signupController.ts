import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import {
  signupQuery,
  checkEmailQuery,
  checkUsernameQuery,
} from '../../database';
import {
  signupSchema,
  signToken,
  CustomError,
  sendEmail,
  generateWelcomingEmail,
} from '../../utils';

config();

type RequestWithBody = Request & {
  body: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
  }
};

const signupController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    await signupSchema.validateAsync({
      username,
      email,
      password,
      confirmPassword,
    });

    const { rows: emailRows } = await checkEmailQuery({ email });
    const { rows: usernameRows } = await checkUsernameQuery({ username });

    if (emailRows.length) {
      throw new CustomError('Email already exists', 409);
    }
    if (usernameRows.length) {
      throw new CustomError('Username already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const { rows: user } = await signupQuery({
      username,
      email,
      password: hashedPassword,
    });

    const token = await signToken(
      {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
      { expiresIn: '1d' }
    );

    // add user to req object
    await sendEmail(
      email,
      'Welcome to Karam Thoughts',
      generateWelcomingEmail(username)
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 86400000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production' ? true : false,
      })
      .status(201)
      .json({
        error: false,
        data: {
          message: 'Signup successful',
          user: {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
          },
        },
      });
  } catch (err) {
    next(err);
  }
};

export default signupController;
