import { Request, Response, NextFunction } from 'express';
import { CustomError, generateSlug } from '../../utils';
import { getPostByIdQuery, editPostQuery } from '../../database';
import uniqid from 'uniqid';

const editPostController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { rows } = await getPostByIdQuery({ id: Number(id) });
    if (!rows.length) {
      throw new CustomError('Post not found', 404);
    }
    if (rows[0].user_id !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    const slug = generateSlug(title) + '-' + uniqid.process();

    const { rows: updatedPost } = await editPostQuery({
      id: Number(id),
      title,
      content,
      slug
    });
    res.status(200).json({
      error: false,
      data: {
        message: 'Post edited successfully',
        post: updatedPost[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editPostController;
