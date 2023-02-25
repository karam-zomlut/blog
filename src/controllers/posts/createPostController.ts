import { Response, NextFunction } from 'express';
import { generateSlug, postSchema } from '../../utils';
import { createPostQuery } from '../../database';
import uniqid from 'uniqid';

// interface RequestWithBody extends Request {
//   body: {
//     title: string;
//     content: string;
//   };
//   user?: {
//     id: number;
//     username: string;
//     email: string;
//   };
// }

const createPostController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    await postSchema.validateAsync({ title, content });

    const slug = generateSlug(title) + '-' + uniqid.process();

    const { rows } = await createPostQuery({
      title,
      content,
      slug,
      userId: id,
    });

    res.status(201).json({
      error: false,
      data: {
        message: 'Post created successfully',
        post: rows[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default createPostController;
