/* eslint-disable node/no-process-env */
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import * as process from 'process';

const result2 = dotenv.config({
  path: path.join(__dirname, `../../env/${process.env.NODE_ENV}.env`),
});

if (result2.error) {
  throw result2.error;
}

if (!process.env.SERVER_NAME) {
  throw new Error('Did you forget to set update environment variables?');
}
