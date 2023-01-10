declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PUBLIC_URL: string;
      SERVER_NAME: string;
      SERVER_VERSION: string;
      SERVER_PORT: string;
      SERVER_URL: string;
      SERVER_SECRET: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      HASH_SALT_ROUNDS: string;
      CORS_ORIGINS: string;
      CORS_PREFLIGHT_MAX_AGE: string;
      CORS_CREDENTIALS: string;
      CORS_ALLOWED_HEADERS: string;
      CORS_EXPOSED_HEADERS: string;
      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_SYNCHRONIZE: string;
      DB_LOGGING: string;
      DB_MIGRATIONS_RUN: string;
      DB_MIGRATIONS_DIR: string;
      DB_MIGRATIONS_TABLE_NAME: string;
      DB_SSL: string;
    }
  }
}

export {};
