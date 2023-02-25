import { getAllPostsQuery, getTotalPostsQuery } from '../../database';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../utils';

const getAllPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (Number(page) - 1) * Number(pageSize);

    const { rows: totalPosts } = await getTotalPostsQuery();

    if (offset > totalPosts[0].count) {
      throw new CustomError('Page not found', 404)
    }

    const { rows } = await getAllPostsQuery({
      pageSize: Number(pageSize),
      offset,
    });
    res.status(200).json({
      error: false,
      message: 'Posts retrieved successfully',
      data: {
        counte: rows.length,
        posts: rows,
      },
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getAllPostsController;