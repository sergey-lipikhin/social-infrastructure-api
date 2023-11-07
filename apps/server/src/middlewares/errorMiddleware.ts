/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import Yup from 'yup';
import { ApiError } from '../exceptions/ApiError';

// without (Error, Request, Response, NextFunction) params structure it will not be an error handle
export function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).send({ message, errors });

    return;
  }

  if (error instanceof Yup.ValidationError) {
    const errors = error.inner.reduce((errorsAcc, currentError) => ({
      ...errorsAcc,
      [currentError.path as string]: currentError.message,
    }), {});

    res.status(400).send({
      message: 'Помилка валідації',
      errors,
    });

    return;
  }

  res.status(500).send({
    mesage: 'Внутрішня помилка сервера',
  });
}
