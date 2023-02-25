import { Router } from 'express';
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  editPostController,
} from '../controllers';
import { checkAuth } from '../middlewares';

const postRouter = Router();

postRouter.get('/', getAllPostsController);
postRouter.get('/:id', getPostController);
postRouter.use(checkAuth);
postRouter.post('/create', createPostController);
postRouter.delete('/delete/:id', deletePostController);
postRouter.put('/edit/:id', editPostController);

export default postRouter;