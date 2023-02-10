import AppResponse from '@Classes/AppResponse';
import User from '@Database/entities/User';
import { IRequest } from '@Interfaces/IRequest';
import userService from '@Services/user/1.1.0';
import { HttpStatusCode } from 'axios';
import { Next, Response } from 'restify';

export const listAllUsers = async (
  req: IRequest<
    void,
    void,
    {
      limit?: number;
      page?: number;
    }
  >,
  res: Response,
  next: Next
) => {
  try {
    const data = await userService.list(req.query);

    res.send(HttpStatusCode.Ok, new AppResponse(data));

    return next();
  } catch (err) {
    return next(err);
  }
};

export const saveUser = async (
  req: IRequest<User>,
  res: Response,
  next: Next
) => {
  try {
    const data = await userService.save(req.body);

    res.send(HttpStatusCode.Created, new AppResponse(data));

    return next();
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (
  req: IRequest<void, { id: string }>,
  res: Response,
  next: Next
) => {
  try {
    const data = await userService.findOne(req.params.id);

    res.send(HttpStatusCode.Ok, new AppResponse(data));

    return next();
  } catch (err) {
    return next(err);
  }
};
