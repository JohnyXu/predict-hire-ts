import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import resolvers from '../resolvers';
import typeDefs from '../typedefs';

import connectMongo from '../helper/connect';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query } = createTestClient(server);

describe('Company resolver', () => {
  beforeAll(async () => {
    await connectMongo();
  });

  test('get companies', async () => {
    const GET_COMPANIES = gql`
      query {
        getCompanies {
          id
          name
          address
        }
      }
    `;

    const {
      data: { getCompanies },
    } = await query({ query: GET_COMPANIES });
    expect(getCompanies).toEqual([
      {
        id: '5e5df7fc6953acd3dc50fe8f',
        name: 'PredictiveHire',
        address: '15 Newton St',
      },
    ]);
    expect(getCompanies).toMatchSnapshot();
  });
});
