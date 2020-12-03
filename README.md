# Code Test

## Overview

Nodejs, Typescript, Mongodb, Docker, GraphQL, Apollo, Jest, ESLint, Prettier

### Project Structure

```
src/
├── seeder/ add seeder data to mongodb for test
├── test/ some tests file on resolver file
├── helper/ some util function for project
│ ├── date
│ ├── connect
│ ├── JwtService
├── interface/ interface definition for project
├── middleware/ contain methods about protect route
├── models/ Mongo Schema definition
├── resolvers/ api implementation
├── typdefs/ graphql definition files
├── validator/ validation on user input
└── main.ts
```

## Getting Started

### Prerequisites

- Git
- Node(Yarn or Npm)
- Docker
- MongodDB

### Installation

1. git clone https://github.com/JohnyXu/predict-hire-ts.git
2. `yarn install` to install the dependencies

### Running locally

1. `docker-compose up --build`, it may take some time, be patient with the installation
2. open http://localhost:3005/graphql to open the site in your favorite browser

### GraphQL demo exemple

1. Login first to get token for `Authorization`

```graphql
mutation {
  login(loginInput: { username: "mark", password: "mark" }) {
    id
    name
    username
    role
    companyId
    token
  }
}
```

2. View one vacancy(add token from login)

```graphql
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
```

3. Create a vacancy(add token from login by Admin)

```graphql
mutation {
  createVacancy(
    vacancy: {
      title: "title@3"
      description: "description@3"
      expiredAt: "3days"
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
```

4. Update a vacancy(add token from login by Admin)

```graphql
mutation {
  updateVacancy(
    id: "5fc0a7b4db40982a12b1e3d7"
    vacancy: {
      title: "title@3"
      description: "description@3"
      expiredAt: "40days"
    }
  ) {
    title
    description
    id
    expiredAt
    userId
    companyId
  }
}
```

5. View all vacancies(add token from login)

```graphql
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
```

6. Delete a vacancy(add token from login by Admin)

```graphql
mutation {
  deleteVacancy(id: "5fc0a7b4db40982a12b1e3d7")
}
```

### Running the tests locally

1. `yarn test` to run tests on resolver file

### Lint

1. `yarn eslint` to check syntax on the file
2. `yarn prettier` to keep code in the same style
3. add `pre-commit` to check syntax before commit

## TODO

1. How to write this project in Microservices?
2. Try to use NestJS or Koa
