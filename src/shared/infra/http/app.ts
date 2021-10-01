import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';

import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';
import '@shared/containers/index';

import { router } from './routes';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      // eslint-disable-next-line no-underscore-dangle
      root: global.__dirname,
    }),
  ],
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Interval server error = ${err.message}`,
    });
  }
);

export { app };
