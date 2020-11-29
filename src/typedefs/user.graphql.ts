import { gql } from 'apollo-server-express';

export default gql`
  type UserInfo {
    id: ID!
    name: String!
    username: String!
    role: String!
    companyId: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    role: String!
    companyId: String!
    token: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  extend type Query {
    getUsers: [UserInfo]
    getUser(id: ID!): UserInfo
  }

  extend type Mutation {
    login(loginInput: LoginInput): User!
  }
`;
