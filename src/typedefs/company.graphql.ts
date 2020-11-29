import { gql } from 'apollo-server-express';
export default gql`
  type Company {
    id: ID!
    name: String!
    address: String!
  }

  extend type Query {
    getCompanies: [Company]
  }
`;
