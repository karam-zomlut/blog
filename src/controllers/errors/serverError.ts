import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

interface CustomError extends Error {
  status?: number;
  message: string;
  data?: any;
}

const serverError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status;
  const message = err.message;
  const data = err.data;
  console.log(err);
  

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: true,
      data: {
        message: err.message,
      },
    });
  } else if (status) {
    res.status(status).json({
      error: true,
      data: {
        message,
        data,
      },
    });
  } else {
    res.status(500).json({
      error: true,
      data: {
        message: 'Internal server error',
      },
    });
  }
};

export default serverError;
