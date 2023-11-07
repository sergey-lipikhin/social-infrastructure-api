import express from 'express';
import { authController } from '../controllers/authController';
import { catchError } from '../middlewares/catchError';

export const authRouter = express.Router();

authRouter.post('/registration', catchError(authController.register));

authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);

authRouter.post('/login', catchError(authController.login));
