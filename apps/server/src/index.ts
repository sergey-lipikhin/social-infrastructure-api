import express from 'express';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import { initDb } from './utils/initDb';

import { authRouter } from './routes/authRouter';
import { kindergartenRouter } from './routes/kindergartenRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

await initDb();

const corsOptons: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptons));
app.use(express.json());

app.use(authRouter);
app.use('/kindergartens', kindergartenRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  global.console.log(`Server is established successfully on PORT=${process.env.PORT}`);
});
