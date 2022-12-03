import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import morgan from 'morgan';
import { getPort } from '@server/lib';

const app = express();

app.set('port', getPort());

app.use(morgan('dev'));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
