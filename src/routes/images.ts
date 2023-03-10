import fs from 'fs';
import { Router, Request, Response } from 'express';
import { checkAuth } from '../middlewares';
import path from 'path';

const imageRouter = Router();

imageRouter.get('/:filename',
  checkAuth,
  (req: Request, res: Response) => {
    const { filename } = req.params;
    const url = path.join(__dirname, '..', '..', 'uploads', filename)

    fs.readFile(url, function (err, data) {
      if (err) {
        res.status(404).send('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });
  }
);

export default imageRouter;
