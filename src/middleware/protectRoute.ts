import { ROLE } from './../constants/user.constant';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

// eslint-disable-next-line
export const isAuthUser = (callback) => (parent, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Login first and attach token with request');
  }
  return callback(parent, args, context, info);
};

// eslint-disable-next-line
export const isAdminUser = (callback) => (parent, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Login first and attach token with request');
  }
  if (context.user.role !== ROLE.Admin) {
    throw new ForbiddenError('Only admin user can access this');
  }
  return callback(parent, args, context, info);
};
