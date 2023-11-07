import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { IUserNormalized } from '../types/IUserNormalized';

function generateAccessToken(user: IUserNormalized): string {
  return jwt.sign(
    user,
    process.env.JWT_ACCESS_SECRET as string,
  );
}

function validateAccessToken(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
  } catch {
    return null;
  }
}

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
};
