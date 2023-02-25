import { deletePostQuery, getPostByIdQuery } from '../../database';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../utils';

const deletePostController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { rows } = await getPostByIdQuery({ id: Number(id) });
    if (!rows.length) {
      throw new CustomError('Post not found', 404);
    }
    if (rows[0].user_id !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    await deletePostQuery({ id: Number(id) });
    res.status(200).json({
      error: false,
      data: {
        message: 'Post deleted successfully',
      },
    });
  } catch (err) {
    next(err);
  }
};

export default deletePostController;