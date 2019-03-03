# INAB - I Need A Budget application 🎉

My toy project for budget management 😊

You can read more about the motivation here - https://namnguyen.design/blog/2019-03-02-introducing-inab-app-aka-i-need-a-budget-%F0%9F%92%B8/

# Tech Stack

Here's a curated list of packages that I use 😎

# Modules Management tool

- [ ] [Yarn](https://yarnpkg.com/)
- [ ] [Lerna](https://lernajs.io/)

### Web

- [ ] [React](https://facebook.github.io/react/)
- [ ] [Reach Router](https://reach.tech/router)
- [ ] [Apollo React](https://www.apollographql.com/docs/react/)
- [ ] [Formik](https://jaredpalmer.com/formik/)
- [ ] [Rechart](http://recharts.org)
- [ ] [Styled Components](https://github.com/styled-components/styled-components)

### Server

- [ ] [Graphql-yoga](https://github.com/prisma/graphql-yoga)
- [ ] [PostgreSQL](https://www.postgresql.org/)
- [ ] [TypeORM](https://typeorm.io)
- [ ] [Redis](https://redis.io/)
- [ ] [Ioredis](https://github.com/luin/ioredis)

### Unit Testing

- [ ] [Jest](http://facebook.github.io/jest/)
- [ ] [React-testing-library](https://github.com/kentcdodds/react-testing-library)

### Linting

- [ ] [TSLint](<[http://eslint.org/](https://palantir.github.io/tslint/)>)
- [ ] [Prettier](https://prettier.io/)

## Packages

This project is made up of 3 packages that share code powered by Yarn Workspaces and Lerna

- web (React.js website)
- server (GraphQL Typescript server)
- common (Code shared between web and server)

## Prerequisite

1. [Yarn](https://yarnpkg.com)
2. [PostgreSQL](https://www.postgresql.org/)
3. [Redis](https://redis.io)

## Installation

1. Clone project

```
git clone https://github.com/willnguyen1312/inab_graphql.git
```

2. cd into folder

```
cd inab_graphql
```

3. Download dependencies

```
yarn
```

4. Start PostgreSQL server

5. Create 2 database called `inab` and `inab-test`

```
createdb inab
createdb inab-test
```

6. Start Redis

```
redis-server
```

7. Fill in the `.env` in server and web packages as per `.env.example`

8. Hit the ground by one commmand

```
yarn start
```

# TODO

- [x] Add Login page
- [x] Add Register page
- [x] Add Home page
- [x] Add Me page
- [ ] Provide register functionality
- [ ] Provide email verification with Nodemailer
- [ ] Authenticate at the client
- [ ] Design Expense entity
- [ ] Add Expense page
- [ ] Provide aggregation for charting
- [ ] Privide customization on how data should be displayed
- [ ] Deployment instructions

P/s: The app's architecture was inspired by [fullstack-graphql-airbnb-cline](https://github.com/benawad/fullstack-graphql-airbnb-clone)
