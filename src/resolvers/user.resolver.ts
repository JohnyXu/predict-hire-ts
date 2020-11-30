import { IUser } from './../models/User';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { generateUserToken } from '../helper/JwtService';
import User from '../models/User';
import { UserEntity } from '../interface/user.types';

export default {
  Query: {
    // eslint-disable-next-line
    getUsers: async (parent, args, context): Promise<Array<IUser>> => {
      if (!context.user) {
        throw new AuthenticationError(
          'Login first and attach token with request',
        );
      }
      try {
        return await User.find();
      } catch (error) {
        throw new Error(error);
      }
    },

    // eslint-disable-next-line
    getUser: async (parent, { id }, context): Promise<IUser> => {
      if (!context.user) {
        throw new AuthenticationError(
          'Login first and attach token with request',
        );
      }

      if (!id.trim()) {
        throw new UserInputError('Empty user id');
      }

      try {
        const user = await User.findById(id);
        if (user) {
          return user;
        }
        throw new Error('User not found');
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    login: async (
      // eslint-disable-next-line
      parent,
      // eslint-disable-next-line
      { loginInput: { username, password } },
    ): Promise<UserEntity> => {
      if (!username.trim()) {
        throw new UserInputError("Error: username can't be empty");
      }
      if (!password.trim()) {
        throw new UserInputError("Error: password can't be empty");
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('Invalid user account');
      }
      const match = await user.matchPassword(password);
      if (!match) {
        throw new UserInputError('Invalid user account');
      }
      const token: string = generateUserToken(user);
      const retUser = {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        companyId: user.companyId,
        token,
      };
      return retUser;
    },
  },
};
