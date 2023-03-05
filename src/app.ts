import express, { Application } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import path = require('path');
import cookieParser from 'cookie-parser';

dotenv.config();
const app: Application = express();


const PORT: Number = Number(process.env.PORT) || 3000;
app.set('port', PORT);

app.disable('x-powered-by');

app.use([express.json(), express.urlencoded({ extended: false }), cookieParser()]);

app.use('/api/v1', router);


export default app;
