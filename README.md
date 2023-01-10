# Restify & TypeScript Node server example

This is a simple example of a Node server using [Restify](http://restify.com/) and [TypeScript](http://www.typescriptlang.org/).

## Technologies

* [Restify](http://restify.com/)
* [TypeScript](http://www.typescriptlang.org/)
* [TypeORM](http://typeorm.io/)
* [Tsyringe](https://www.npmjs.com/package/tsyringe)
* [Jest](https://jestjs.io/)
* [ESLint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [Docker](https://www.docker.com/)
* [Postgres](https://www.postgresql.org/)

## Getting started

### Prerequisites

* [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo (Certifies that you have the [GH CLI](https://cli.github.com/) installed)
```sh
gh repo create <your-new-repo-name> --template lukearch/node-backend-template
```
2. Update the [package.json](package.json) file with your project details
3. Update the `.env` files in the [env](env) folder at the root of the project with your environment variables values
5. Install NPM packages
```sh
npm install # or yarn install
```
6. Run the server
```sh
npm run dev # or yarn dev
```
