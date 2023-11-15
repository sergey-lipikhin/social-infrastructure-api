/* eslint-disable max-len */
import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jwtService';
import { ApiError } from '../exceptions/ApiError';

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw ApiError.Unauthorized();
  }

  const [, accessToken] = authHeader.split(' ');
  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  next();
}
