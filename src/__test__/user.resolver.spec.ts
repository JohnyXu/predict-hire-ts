import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import resolvers from '../resolvers';
import typeDefs from '../typedefs';

import connectMongo from '../helper/connect';

const testUser = {
  id: '5e5df7f450571fb3aecdcf22',
  name: 'Mark Smith',
  username: 'mark',
  role: 'admin',
  companyId: '5e5df7fc6953acd3dc50fe8f',
};

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { user: testUser },
});

const { query, mutate } = createTestClient(server);

describe('User resolver', () => {
  beforeAll(async () => {
    await connectMongo();
  });

  test('login admin user', async () => {
    const LOGIN_USER = gql`
      mutation($username: String!, $password: String!) {
        login(loginInput: { username: $username, password: $password }) {
          id
          name
          username
          role
          companyId
          token
        }
      }
    `;

    const {
      data: { login: loginMark },
    } = await mutate({
      mutation: LOGIN_USER,
      variables: { username: 'mark', password: 'mark' },
    });
    expect(loginMark.username).toBe('mark');
    expect(loginMark.role).toBe('admin');
  });

  test('login normal user success', async () => {
    const LOGIN_USER = gql`
      mutation($username: String!, $password: String!) {
        login(loginInput: { username: $username, password: $password }) {
          id
          name
          username
          role
          companyId
          token
        }
      }
    `;

    const {
      data: { login: loginBob },
    } = await mutate({
      mutation: LOGIN_USER,
      variables: { username: 'bob', password: 'bob' },
    });
    expect(loginBob.username).toBe('bob');
    expect(loginBob.role).toBe('user');
  });

  test('login normal user fail', async () => {
    const LOGIN_USER = gql`
      mutation($username: String!, $password: String!) {
        login(loginInput: { username: $username, password: $password }) {
          id
          name
          username
          role
          companyId
          token
        }
      }
    `;

    const res = await mutate({
      mutation: LOGIN_USER,
      variables: { username: 'bob', password: 'bob1' },
    });
    expect(res.data).toBe(null);
    expect(res.errors).toBeTruthy();
  });

  test('getUsers', async () => {
    const GET_USERS = gql`
      query {
        getUsers {
          id
          name
          username
          role
          companyId
        }
      }
    `;

    const {
      data: { getUsers },
    } = await query({
      query: GET_USERS,
    });
    expect(getUsers).toHaveLength(2);
    expect(getUsers[0]).toBeTruthy();
    expect(getUsers[1]).toBeTruthy();
    expect(getUsers).toMatchSnapshot();
  });

  test('getUser', async () => {
    const GET_USER = gql`
      query {
        getUser(id: "5e5df7f450571fb3aecdcf21") {
          id
          name
          username
          role
          companyId
        }
      }
    `;

    const {
      data: { getUser },
    } = await query({
      query: GET_USER,
    });

    expect(getUser.name).toBe('Bob Markle');
    expect(getUser.username).toBe('bob');
    expect(getUser).toMatchSnapshot();
  });
});
