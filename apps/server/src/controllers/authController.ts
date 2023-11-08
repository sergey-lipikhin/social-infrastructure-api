/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-newline */
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

import { emailService } from '../services/emailService';
import { userService } from '../services/userService';
import { jwtService } from '../services/jwtService';

import {
  loginSchema,
  registrationSchema,
} from '../validation/validationSchema';

import { ApiError } from '../exceptions/ApiError';
import { IUser } from '../types/IUser';
import { User } from '../models/User';

async function register(req: Request, res: Response) {
  const { email, password, name, surname } = req.body;

  await registrationSchema.validate({
    email, password, name, surname,
  }, { abortEarly: false });

  const existingUser = await userService.getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Неможливо зареєструвати користувача', {
      email: 'Користувач з такою поштою вже існує',
    });
  }

  const activationToken = uuid();
  const hash = await bcrypt.hash(password, 10);

  await userService.create({
    email, password: hash, name, activationToken });
  await emailService.sendActivationLink(email, activationToken);

  res.sendStatus(200);
}

async function activate(req: Request, res: Response) {
  const { activationToken } = req.params;
  const user = await userService.getByActivationToken(activationToken);

  if (!user) {
    throw ApiError.NotFound(
      'Активувати акаунт за цим посиланням не вдалося. '
      + 'Посилання не дійсне',
    );
  }

  // USER SERVICE
  user.activationToken = null;
  await user.save();

  sendAuthentication(res, user);
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  await loginSchema.validate({ email, password }, { abortEarly: false });

  const user = await userService.getByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('Користувача з такою поштою не існує');
  }

  if (user.activationToken) {
    throw ApiError.BadRequest(
      'Активуйте акаунт за посиланням, '
      + 'яке було відправлено на пошту',
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadRequest('Невірний пароль');
  }

  sendAuthentication(res, user);
}

async function refresh(req: Request, res: Response) {
  const { accessToken } = req.body;

  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getByEmail((userData as IUser).email);

  if (!user) {
    throw ApiError.Unauthorized();
  }

  sendAuthentication(res, user);
}

async function sendAuthentication(res: Response, user: User) {
  const userData = userService.normalize(user);
  const accessToken = await jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
}

export const authController = {
  register,
  activate,
  login,
  refresh,
};
