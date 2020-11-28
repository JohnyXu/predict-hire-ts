import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from 'graphql-tools';

const helloResolver: IResolvers = {
  Query: {
    helloWorld: (_, args, ctx, info): string => {
      return 'hello world!';
    },
  },
};

export default helloResolver;
