/* eslint-disable node/no-process-env */
import NodeEnv from '@Enums/NodeEnv';

const appSettings = {
  node: {
    env:
      process.env.NODE_ENV === 'development'
        ? NodeEnv.Development
        : process.env.NODE_ENV === 'production'
        ? NodeEnv.Production
        : NodeEnv.Staging,
  },
  security: {
    cors: {
      origins: process.env.CORS_ORIGINS?.split(' ') || '*',
      preflightMaxAge: +process.env.CORS_PREFLIGHT_MAX_AGE || 5,
      credentials: process.env.CORS_CREDENTIALS === 'true',
      allowHeaders: process.env.CORS_ALLOW_HEADERS?.split(' ') || [],
      exposeHeaders: process.env.CORS_EXPOSE_HEADERS?.split(' ') || [],
    },
    hash: {
      saltRounds: +process.env.HASH_SALT_ROUNDS || 10,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      options: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      },
    },
  },
  server: {
    name: process.env.SERVER_NAME || 'My App',
    port: +process.env.SERVER_PORT || 3000,
    secret: process.env.SERVER_SECRET,
    url: process.env.SERVER_URL || 'http://localhost:3000',
    version: process.env.SERVER_VERSION || '1.0.0',
  },
};

export default appSettings;
