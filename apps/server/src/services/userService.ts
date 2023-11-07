import { User } from '../models/User';
import { IUser } from '../types/IUser';
import { IUserNormalized } from '../types/IUserNormalized';

async function getByEmail(email: string): Promise<User | null> {
  return User.findOne({
    where: { email },
  });
}

async function getByActivationToken(
  activationToken: string,
): Promise<User | null> {
  return User.findOne({
    where: { activationToken },
  });
}

async function create(user: Omit<IUser, 'id'>): Promise<User> {
  return User.create({ ...user });
}

function normalize({ id, email, name, surname }: User): IUserNormalized {
  return {
    id,
    email,
    name,
    surname,
  };
}

export const userService = {
  getByEmail,
  getByActivationToken,
  create,
  normalize,
};
