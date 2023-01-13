FROM node:16.17.1-alpine

ENV HOME /usr/src/
WORKDIR $HOME

COPY package.json .
COPY tsconfig.json .
COPY tsconfig.prod.json .

COPY yarn.lock .
COPY build.ts .

COPY env ./env
COPY src ./src


RUN yarn
RUN yarn build
RUN yarn tree

CMD yarn start

