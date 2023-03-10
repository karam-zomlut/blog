import { Response, NextFunction } from 'express';
import { CustomError, generateSlug, postSchema } from '../../utils';
import { createPostQuery } from '../../database';
import uniqid from 'uniqid';

type RequestWithBody = Request & {
  body: any;
  user?: {
    id: number;
    username?: string;
    email?: string;
    verified?: boolean;
  };
};

const createPostController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;
    if (!req.user) {
      throw new CustomError('Unauthorized', 401);
    }
    const { id } = req.user;

    await postSchema.validateAsync({ title, content });

    const slug = generateSlug(title) + '-' + uniqid.process();

    const imagePathLink = req.file.path.split('uploads\\').join('/');

    const { rows } = await createPostQuery({
      title,
      content,
      slug,
      image: imagePathLink,
      userId: id,
    });

    res.status(201).json({
      error: false,
      data: {
        message: 'Post created successfully',
        post: {
          ...rows[0],
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default createPostController;
