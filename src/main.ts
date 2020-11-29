import dotenv from 'dotenv';
dotenv.config();

import { getTokenUser } from './helper/JwtService';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import typeDefs from './typedefs';
import resolvers from './resolvers';
import connectMongo from './helper/connect';

import { UserEntity } from './interface/user.types';

async function bootstrap() {
  const app = express();
  app.get('/', (req, res) => res.send('App is working'));
  app.use('*', cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  await connectMongo();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(7)],
    context: async ({ req }) => {
      const user: UserEntity = await getTokenUser(req.headers.authorization);
      return { user };
    },
    playground: true,
  });
  server.applyMiddleware({ app });

  const PORT = config.app.port;
  app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n🚀  Listening on ${url}`);
    console.log(`\n🚀  GraphQL is now running on ${url}/graphql`);
  });
}

bootstrap();
