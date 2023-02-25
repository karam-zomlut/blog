import { getPostByIdQuery } from '../../database';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils';

const getPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { rows } = await getPostByIdQuery({ id: Number(id) });
    if (!rows.length) {
      throw new CustomError('Post not found', 404);
    }
    res.status(200).json({
      error: false,
      data: {
        message: 'Post retrieved successfully',
        post: rows[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getPostController;