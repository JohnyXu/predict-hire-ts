import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './typedefs';
import resolvers from './resolvers';
import connectMongo from './helper/connect';

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
    context: async ({ req, res }) => {
      return { req, res };
    },
    playground: true,
  });
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n🚀  Listening on ${url}`);
    console.log(`\n🚀  GraphQL is now running on ${url}/graphql`);
  });
}

bootstrap();
