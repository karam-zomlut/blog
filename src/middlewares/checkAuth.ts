import { Request, Response, NextFunction } from 'express';
import { CustomError, verifyToken } from '../utils';

interface RequestWithToken extends Request {
  user?: {
    id: number;
    username?: string;
    email?: string;
    verified?: boolean;
  };
}

const checkAuth = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new CustomError('Unauthorized', 401);
    }
    const decodedToken: any = await verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      res.status(401).json({
        error: true,
        data: {
          message: 'Unauthorized',
        },
      });
    }
    
    next(err);
  }
};

export default checkAuth;
