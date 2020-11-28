import { gql } from 'apollo-server-express';
import helloSchema from './hello.graphql';

const schema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default [schema, helloSchema];
