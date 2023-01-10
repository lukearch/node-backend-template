import * as restify from 'restify';
import { Request, Response } from 'restify';
import * as cors from 'restify-cors-middleware';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from 'jet-logger';
import { DefinedHttpError } from 'restify-errors';
import appSettings from '@Config/settings';
import NodeEnv from '@Enums/NodeEnv';
import guardian from '@Middlewares/guardian';
import DatabaseClient from '@Core/DbClient';
import { injectable } from 'tsyringe';
import controllers from '@Controllers/index';
import Route from '@Interfaces/Route';

@injectable()
export default class Server {
  private readonly app: restify.Server;

  constructor() {
    this.app = restify.createServer({
      name: appSettings.server.name,
      version: appSettings.server.version,
    });
  }

  get instance(): restify.Server {
    return this.app;
  }

  get databaseClient(): DatabaseClient {
    return new DatabaseClient();
  }

  public async start(callback?: () => void): Promise<void> {
    const _options: cors.Options = {
      preflightMaxAge: appSettings.security.cors.preflightMaxAge,
      origins: [...appSettings.security.cors.origins],
      allowHeaders: [...appSettings.security.cors.allowHeaders],
      exposeHeaders: [...appSettings.security.cors.exposeHeaders],
      credentials: appSettings.security.cors.credentials,
    };

    const _cors: cors.CorsMiddleware = cors.default(_options);

    this.app.pre(restify.plugins.pre.context());
    this.app.pre(_cors.preflight);
    this.app.use(_cors.actual);
    this.app.use(restify.plugins.bodyParser());
    this.app.use(restify.plugins.queryParser());

    if (
      appSettings.node.env === NodeEnv.Production ||
      appSettings.node.env === NodeEnv.Staging
    ) {
      this.app.use(restify.plugins.conditionalRequest());
      this.app.use(helmet());
    }

    if (appSettings.node.env === NodeEnv.Development) {
      this.app.use(restify.plugins.conditionalRequest());
      this.app.use(restify.plugins.gzipResponse());
      this.app.use(restify.plugins.requestLogger());
      this.app.use(morgan('dev'));
    }

    this.app.on(
      'restifyError',
      (req: Request, res: Response, err: DefinedHttpError) => {
        err.toJSON = function customToJSON() {
          return {
            code: this.statusCode,
            message: this.body.message,
          };
        };

        err.toString = function customToString() {
          return JSON.stringify(this.toJSON());
        };

        logger.err(err.toString());

        return guardian(err, req, res);
      }
    );

    return new Promise((resolve, reject) => {
      try {
        this.app.listen(appSettings.server.port, () => {
          logger.info(
            `Server ${appSettings.server.name}:v${appSettings.server.version} is listening on port ${appSettings.server.port}`
          );
          if (callback) {
            callback();
          }
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public async stop(callback?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.app.close(() => {
          logger.info(`Server ${appSettings.server.name} is stopped`);
          if (callback) {
            callback();
          }
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public startControllers(): void {
    controllers().forEach(controller => {
      controller.register(this);
    });
  }

  public registerRoute(route: Route): void {
    const { method, path, middlewares, handler } = route;
    const parsedPath = `/api/v${appSettings.server.version}${path}`;

    this.instance[method](parsedPath, middlewares, async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        return next(err);
      }
    });

    logger.info(`Route ${method.toUpperCase()} ${parsedPath} registered`);
  }
}
