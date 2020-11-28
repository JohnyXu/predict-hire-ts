import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const app = express();
app.get('/', (req, res) => res.send('App is working'));
app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`\n🚀  Listening on http://localhost:${PORT}`);
  console.log(
    `\n🚀  GraphQL is now running on http://localhost:${PORT}/graphql`,
  );
});
