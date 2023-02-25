import { Request, Response } from 'express';

const logoutController = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({
    error: false,
    data: {
      message: 'Logout successful',
    },
  });
};

export default logoutController;