import { JsonWebTokenError } from 'jsonwebtoken';
import { verifyAccountQuery } from '../../database';
import { CustomError, verifyToken } from '../../utils';
import { NextFunction, Request, Response } from 'express';

type RequestWithQuery = Request & {
  query: {
    token: string;
  };
};

const verifyAccountController = async (
  req: RequestWithQuery,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    const { id } = (await verifyToken(token)) as { id: number };

    const { rows } = await verifyAccountQuery({ id });

    res.status(200).json({
      error: false,
      data: {
        message: 'Account verified successfully',
        user: {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
          verified: rows[0].verified,
        },
      },
    });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(new CustomError('Invalid token', 401));
    }
    next(err);
  }
};

export default verifyAccountController;
