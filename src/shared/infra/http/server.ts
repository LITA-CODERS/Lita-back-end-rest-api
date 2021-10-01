import 'dotenv/config';

import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

import { connection } from '../typeorm';
import { app } from './app';

connection();

Sentry.init({
  dsn: 'https://95684c28645446acaffabea99d7273b7@o1022168.ingest.sentry.io/5988273',
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      // eslint-disable-next-line no-underscore-dangle
      root: global.__dirname,
    }),
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

app.listen(process.env.PORT || 3333, () => console.log('Server is running!'));
