import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';

import '@shared/container';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

export { app };
