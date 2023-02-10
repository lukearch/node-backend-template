/* eslint-disable node/no-process-env */
import '@Scripts/pre-start';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import * as fs from 'fs-extra';
import * as process from 'process';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE === 'postgres' ? 'postgres' : 'mongodb',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [path.resolve(__dirname, 'entities', '*.{ts,js}')],
  migrations: [path.resolve(__dirname, 'migrations', '*.{ts,js}')],
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrationsTableName: 'migrations',
  ssl:
    (process.env.DB_SSL === 'true' && {
      ca: fs
        .readFileSync(path.resolve(__dirname, '../../certs', 'ca.crt'))
        .toString(),
    }) ||
    false,
} as unknown as DataSourceOptions);
