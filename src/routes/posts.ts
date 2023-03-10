import { Router } from 'express';
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  editPostController,
} from '../controllers';
import { checkAuth } from '../middlewares';
import { upload } from '../utils';

const postRouter = Router();

postRouter.get('/', getAllPostsController);
postRouter.get('/:id', getPostController);
postRouter.use(checkAuth);
postRouter.post('/create', upload.single('image'), createPostController);
postRouter.delete('/delete/:id', deletePostController);
postRouter.put('/edit/:id', editPostController);

export default postRouter;
