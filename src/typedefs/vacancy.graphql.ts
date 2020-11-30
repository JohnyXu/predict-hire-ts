import { gql } from 'apollo-server-express';

export default gql`
  type Vacancy {
    id: ID!
    title: String!
    description: String!
    expiredAt: String!
    userId: String!
    companyId: String!
  }

  input VacancyCreateInput {
    title: String!
    description: String!
    expiredAt: String!
  }

  input VacancyUpdateInput {
    title: String
    description: String
    expiredAt: String
  }

  extend type Query {
    getVacancies: [Vacancy]
    getVacancy(id: ID!): Vacancy
  }

  extend type Mutation {
    createVacancy(vacancy: VacancyCreateInput): Vacancy!
    updateVacancy(id: ID!, vacancy: VacancyUpdateInput): Vacancy!
    deleteVacancy(id: ID!): Boolean!
  }
`;
