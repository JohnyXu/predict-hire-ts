import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import resolvers from '../resolvers';
import typeDefs from '../typedefs';

import connectMongo from '../helper/connect';
import { VacancyInputEntity } from '../interface/vacancy.types';

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

describe('Vacancy resolver', () => {
  beforeAll(async () => {
    await connectMongo();
  });

  const newVacancy: VacancyInputEntity = {
    title: 'title@3',
    description: 'description@3',
    expiredAt: '7days',
  };
  const modifiedVacancy: VacancyInputEntity = {
    title: 'title@4',
    description: 'description@4',
    expiredAt: '10days',
  };
  let vacancyId;

  test('getVacancies', async () => {
    const GET_VACANCIES = gql`
      query {
        getVacancies {
          id
          title
          description
          expiredAt
          companyId
          userId
        }
      }
    `;

    const {
      data: { getVacancies },
    } = await query({
      query: GET_VACANCIES,
    });
    expect(getVacancies.length).toBeGreaterThanOrEqual(2);
    expect(getVacancies[0]).toBeTruthy();
    expect(getVacancies[1]).toBeTruthy();
  });

  test('getVacancy', async () => {
    const GET_VACANCY = gql`
      query {
        getVacancy(id: "5fc09f9b8f32c726b8fc679a") {
          id
          title
          description
          expiredAt
          companyId
          userId
        }
      }
    `;

    const {
      data: { getVacancy },
    } = await query({
      query: GET_VACANCY,
    });

    expect(getVacancy.title).toBe('Front end developer');
    expect(getVacancy.description).toBe('Develop web ui page');
  });

  test('createVacancy', async () => {
    const CREATE_VACANCY = gql`
      mutation($title: String!, $description: String!, $expiredAt: String!) {
        createVacancy(
          vacancy: {
            title: $title
            description: $description
            expiredAt: $expiredAt
          }
        ) {
          id
          title
          description
          expiredAt
          userId
          companyId
        }
      }
    `;

    const {
      data: { createVacancy },
    } = await mutate({
      mutation: CREATE_VACANCY,
      variables: {
        ...newVacancy,
      },
    });
    vacancyId = createVacancy.id;
    expect(createVacancy.title).toBe('title@3');
    expect(createVacancy.description).toBe('description@3');
  });

  test('updateVacancy', async () => {
    const UPDATE_VACANCY = gql`
      mutation(
        $id: ID!
        $title: String!
        $description: String!
        $expiredAt: String!
      ) {
        updateVacancy(
          id: $id
          vacancy: {
            title: $title
            description: $description
            expiredAt: $expiredAt
          }
        ) {
          id
          title
          description
          expiredAt
          userId
          companyId
        }
      }
    `;

    const {
      data: { updateVacancy },
    } = await mutate({
      mutation: UPDATE_VACANCY,
      variables: {
        id: vacancyId,
        ...modifiedVacancy,
      },
    });

    vacancyId = updateVacancy.id;
    expect(updateVacancy.title).toBe('title@4');
    expect(updateVacancy.description).toBe('description@4');
  });

  test('deleteVacancy', async () => {
    const DELETE_VACANCY = gql`
      mutation($id: ID!) {
        deleteVacancy(id: $id)
      }
    `;

    const {
      data: { deleteVacancy },
    } = await mutate({
      mutation: DELETE_VACANCY,
      variables: {
        id: vacancyId,
      },
    });
    expect(deleteVacancy).toBeTruthy();
  });
});
