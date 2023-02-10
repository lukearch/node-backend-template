import { Request, Response, Next } from 'restify';
import { DefinedHttpError } from 'restify-errors';
import AppResponse from '@Classes/AppResponse';

const guardian = (
  err: DefinedHttpError,
  _: Request,
  res: Response,
  next: Next
) => {
  res.send(err.statusCode, new AppResponse(err));
  return next();
};

export default guardian;
