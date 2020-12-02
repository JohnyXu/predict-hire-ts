import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { UserEntity } from '../interface/user.types';
import { IUser } from './../models/User';

export const getTokenUser = (authorization: string): UserEntity => {
  if (!authorization) {
    return;
  }
  const token: string = authorization.split('Bearer ')[1];
  if (!token) {
    throw new Error('Invalid Authorization format');
  }
  try {
    const user: UserEntity = jwt.verify(token, process.env.SECRET);
    return user;
  } catch (error) {
    throw new AuthenticationError('Invalid Token or Expired Token');
  }
};

export const generateUserToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      companyId: user.companyId,
    },
    process.env.SECRET,
    { expiresIn: '1h' },
  );
};
