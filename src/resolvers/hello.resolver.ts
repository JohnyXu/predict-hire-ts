import { IResolvers } from 'graphql-tools';

const helloResolver: IResolvers = {
  Query: {
    helloWorld: (): string => {
      return 'hello world!';
    },
  },
};

export default helloResolver;
