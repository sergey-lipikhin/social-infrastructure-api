import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { initDb } from './utils/initDb';

import { authRouter } from './routes/authRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { experimentRouter } from './routes/experimentRouter';

const app = express();

await initDb();

const corsOptons: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
  credentials: true,
};

app.use(morgan('dev'));

app.use(cors(corsOptons));
app.use(express.json());
app.use('/', express.static('public'));

app.use(authRouter);
app.use('/experiment', experimentRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  global.console.log(`Server is established successfully on PORT=${process.env.PORT}`);
});
