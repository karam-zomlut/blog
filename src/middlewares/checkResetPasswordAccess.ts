import { Request, Response, NextFunction } from 'express';
import { CustomError, verifyToken } from '../utils';

interface RequestWithToken extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    verified: boolean;
  };
  resetPasswordAccsess?: boolean;
  query: {
    token?: string;
  };
}

const checkResetPasswordAccess = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new CustomError('Unauthorized', 401);
    }
    const decodedToken: any = await verifyToken(token);
    req.user = decodedToken;
    req.resetPasswordAccsess = true;
    next();
  } catch (err) {
    return next(err);
  }
};

export default checkResetPasswordAccess;
