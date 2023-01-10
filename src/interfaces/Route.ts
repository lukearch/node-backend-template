import { RequestHandler } from 'restify';

interface Route {
  method: 'get' | 'post' | 'put' | 'del';
  path: string;
  handler: RequestHandler;
  middlewares: RequestHandler[];
}

export default Route;
