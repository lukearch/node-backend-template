import User from '@Database/entities/User';
import { getRepository } from '@Utils/getRepository';
import logger from '@Utils/logger';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'restify-errors';

const save = async (user: User): Promise<User> => {
  if (!user) {
    throw new BadRequestError('You should provide a user.');
  }

  if (!user.name) {
    throw new BadRequestError('You should provide a name.');
  }

  if (!user.email) {
    throw new BadRequestError('You should provide an email.');
  }

  if (!user.password) {
    throw new BadRequestError('You should provide a password.');
  }

  const repository = await getRepository(User);

  const toSave = repository.create(user);

  return repository
    .save(toSave)
    .catch(e => {
      logger.err(e.toString());
      throw new InternalServerError('An error occurred while saving the user.');
    })
    .then(user => {
      delete user.password;
      return user;
    });
};

const list = async (queryOptions?: { limit?: number; page?: number }) => {
  const { limit, page } = queryOptions;

  const _limit = limit ? Number(limit) : 10;
  const _page = page === 0 ? 1 : page ? Number(page) : 1;

  const repository = await getRepository(User);

  return repository
    .findAndCount({
      order: {
        updatedAt: 'DESC',
      },
      take: _limit,
      skip: _limit * (_page - 1),
    })
    .catch(() => {
      throw new InternalServerError('An error occurred while listing users.');
    })
    .then(data => {
      data[0].forEach(user => {
        delete user.password;
      });

      return {
        data: data[0],
        total: data[1],
        limit: _limit,
        page: _page,
      };
    });
};

const findOne = async (id: string) => {
  if (!id) {
    throw new BadRequestError('You should provide an id.');
  }

  const repository = await getRepository(User);

  return repository
    .findOne({
      where: {
        id,
      },
    })
    .catch(() => {
      throw new InternalServerError(
        'An error occurred while finding the user.'
      );
    })
    .then(data => {
      if (!data) {
        throw new NotFoundError('User not found.');
      }

      return data;
    });
};

const userService = {
  save,
  list,
  findOne,
};

export default userService;
