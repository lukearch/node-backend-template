import { RequestHandler } from 'restify';

interface Route {
  method: 'get' | 'post' | 'put' | 'del';
  path: string;
  versions: {
    version: string | string[];
    handler: RequestHandler;
    middlewares: RequestHandler[];
  }[];
}

export default Route;
