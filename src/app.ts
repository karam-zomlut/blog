import express, { Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cookieParser from 'cookie-parser';
import { checkAuth } from './middlewares';

dotenv.config();
const app: Application = express();

const PORT: Number = Number(process.env.PORT) || 3000;
app.set('port', PORT);

app.disable('x-powered-by');
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);


app.use('/api/v1', router);
app.use(checkAuth, express.static('uploads'));

export default app;
