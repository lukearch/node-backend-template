import AppResponse from '@Classes/AppResponse';
import appSettings from '@Config/settings';
import DatabaseClient from '@Core/DbClient';
import { HttpStatusCode } from '@Enums/HttpStatusCode';
import NodeEnv from '@Enums/NodeEnv';
import { IRequest } from '@Interfaces/IRequest';
import Route from '@Interfaces/Route';
import guardian from '@Middlewares/guardian';
import { routes } from '@Routes/routes';
import logger from '@Utils/logger';
import { getNextAvailablePort } from '@Utils/portResolver';
import helmet from 'helmet';
import morgan from 'morgan';
import * as restify from 'restify';
import * as cors from 'restify-cors-middleware';
import { DefinedHttpError, NotFoundError } from 'restify-errors';
import { injectable } from 'tsyringe';

@injectable()
export default class Server {
  private readonly app: restify.Server;
  private routes: Route[] = [];

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

  public async start(port?: number, callback?: () => void): Promise<void> {
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
      this.app.use(helmet());
    }

    if (appSettings.node.env === NodeEnv.Development) {
      this.app.use(morgan('dev'));
    }

    this.app.on(
      'restifyError',
      (
        req: restify.Request,
        res: restify.Response,
        err: DefinedHttpError,
        next: restify.Next
      ) => {
        err.toJSON = () => {
          return {
            code: err.statusCode,
            message: err.body.message,
          };
        };

        err.toString = () => {
          return `${err.statusCode} - ${err.message}`;
        };

        if (appSettings.node.env === NodeEnv.Development) {
          logger.err(err.toString());
        }

        return guardian(err, req, res, next);
      }
    );

    const _port = await getNextAvailablePort(
      port ? port : appSettings.server.port
    );

    this.app.listen(_port, () => {
      logger.imp(
        `started server on port ${_port} in ${
          appSettings.node.env
        } mode, url: ${this.app.url.replace('[::]', 'localhost')}`
      );

      if (callback) {
        callback();
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

  public configure(): void {
    this.app.get('/api/routes', (_: IRequest, res: restify.Response) => {
      res.send(
        HttpStatusCode.Ok,
        new AppResponse({
          name: appSettings.server.name,
          version: appSettings.server.version,
          routes: this.routes.map(route => {
            return {
              method: route.method,
              path: route.path,
              availableVersions: route.versions.map(version => {
                return version.version;
              }),
            };
          }),
        })
      );
    });

    this.app.router.defaultRoute = (
      _: IRequest,
      __: restify.Response,
      next: restify.Next
    ) => {
      return next(
        new NotFoundError(
          `A rota ${_.path()} não existe no servidor, por favor acesse /api/routes para ver as rotas disponíveis.`
        )
      );
    };

    routes.map(route => {
      this.registerRoute(route);
    });

    logger.imp(
      `server ${appSettings.server.name} is configured and ready to go`
    );
  }

  public registerRoute(route: Route): void {
    const { method, path, versions } = route;
    const parsedPath = `/api/${path.startsWith('/') ? path.slice(1) : path}`;

    this.app[method](
      parsedPath,
      restify.plugins.conditionalHandler(
        versions.map(version => {
          return {
            version: version.version,
            handler: [...version.middlewares, version.handler],
          };
        })
      )
    );

    this.routes.push({
      ...route,
      path: parsedPath,
    });
  }
}
