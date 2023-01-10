import { Request } from 'restify';

export interface IRequest<B = void, P = void, Q = void, C = string>
  extends Request {
  body: B;
  params: P;

  query: Q;
  get: (contextService: C) => C;
  set: (contextService: C, value: C) => C;
}
