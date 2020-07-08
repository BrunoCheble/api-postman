import 'reflect-metadata';

import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
});
app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333');
});
