import { IUser } from './IUser';

export type IUserNormalized = Omit<IUser, 'password' | 'activationToken'>;
