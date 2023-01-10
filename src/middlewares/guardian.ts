import { Request, Response } from 'restify';
import { DefinedHttpError } from 'restify-errors';
import AppResponse from '@Classes/AppResponse';

const guardian = (err: DefinedHttpError, _: Request, res: Response) => {
  res.send(err.statusCode, new AppResponse(err));
};

export default guardian;
