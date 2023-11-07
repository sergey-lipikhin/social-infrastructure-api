import express from 'express';
import { kindergartenController } from '../controllers/kindergartenController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { catchError } from '../middlewares/catchError';

export const kindergartenRouter = express.Router();

kindergartenRouter.get(
  '/',
  catchError(authMiddleware),
  catchError(kindergartenController.getAll),
);
