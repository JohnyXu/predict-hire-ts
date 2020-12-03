# Code Test

## Overview

Nodejs, Typescript, Mongodb, Docker, GraphQL, Apollo, Jest, ESLint, Prettier

### Project Structure

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

### Running the tests locally

1. `yarn test` to run tests on resolver file

### Lint

1. `yarn eslint` to check syntax on the file
2. `yarn prettier` to keep code in the same style
3. add `pre-commit` to check syntax before commit
