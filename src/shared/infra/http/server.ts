import 'dotenv/config';

import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

import { connection } from '../typeorm';
import { app } from './app';

connection();

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

app.listen(process.env.PORT || 3333, () => console.log('Server is running!'));
