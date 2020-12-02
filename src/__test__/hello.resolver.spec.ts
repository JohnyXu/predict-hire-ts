import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import resolvers from '../resolvers';
import typeDefs from '../typedefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query } = createTestClient(server);

describe('Hello resolver', () => {
  test('query helloWorld', async () => {
    const HELLO_WORLD = gql`
      query {
        helloWorld
      }
    `;

    const {
      data: { helloWorld },
    } = await query({ query: HELLO_WORLD });
    expect(helloWorld).toEqual('hello world!');
  });
});
