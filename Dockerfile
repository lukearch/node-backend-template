FROM node:16.15.1-alpine

ENV HOME /usr/src/
WORKDIR $HOME

RUN npm install --location=global npm@9.2.0

COPY package.json .
COPY tsconfig.json .
COPY tsconfig.prod.json .

COPY yarn.lock .
COPY build.ts .
COPY env ./env

# COPY cert ./cert
COPY src ./src


RUN yarn
RUN yarn build

EXPOSE 8080

CMD yarn start

