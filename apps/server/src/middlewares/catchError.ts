/* eslint-disable max-len */
import { RequestHandler } from 'express';

export function catchError(callback: RequestHandler): RequestHandler {
  return async(...params) => {
    try {
      await callback(...params);
    } catch (error) {
      const [, , next] = params;

      next(error);
    }
  };
}
