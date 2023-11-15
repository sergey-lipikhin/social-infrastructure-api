import express from 'express';
import { catchError } from '../middlewares/catchError';
import { authMiddleware } from '../middlewares/authMiddleware';
import { experimentController } from '../controllers/experimentController';

export const experimentRouter = express.Router();

experimentRouter.post(
  '/',
  catchError(authMiddleware),
  catchError(experimentController.makeExperiment),
);

experimentRouter.get(
  '/',
  catchError(experimentController.getAll),
);

experimentRouter.delete(
  '/:id',
  catchError(authMiddleware),
  catchError(experimentController.remove),
);
