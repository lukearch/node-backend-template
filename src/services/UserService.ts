import { Service } from '@Classes/Service';
import User from '@Database/entities/User';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'restify-errors';
import logger from 'jet-logger';
import { injectable } from 'tsyringe';

@injectable()
class UserService extends Service<User> {
  constructor() {
    super();
    this.setup(User).then();
  }

  public async save(user: User): Promise<User> {
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

    const toSave = this.repository.create(user);

    return this.repository
      .save(toSave)
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError(
          'An error occurred while saving the user.'
        );
      })
      .then(user => {
        delete user.password;
        return user;
      });
  }

  public async list(queryOptions?: {
    limit?: number;
    offset?: number;
    page?: number;
  }): Promise<{
    data: User[];
    total: number;
    limit: number;
    offset: number;
    page: number;
  }> {
    const { limit, offset, page } = queryOptions;

    const _limit = limit ? Number(limit) : 10;
    let _offset = offset ? Number(offset) : 0;
    const _page = page ? Number(page) : 1;

    if (_offset === 0 && page) {
      _offset = (_page - 1) * _limit;
    }

    return this.repository
      .findAndCount({
        order: {
          name: 'DESC',
        },
        take: _limit,
        skip: _offset,
      })
      .catch(err => {
        logger.err(err);
        throw new InternalServerError('An error occurred while listing users.');
      })
      .then(data => {
        return {
          data: data[0],
          total: data[1],
          limit: _limit,
          offset: _offset,
          page: _page,
        };
      });
  }

  public async findOne(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestError('You should provide an id.');
    }

    const user = await this.repository
      .findOne({
        where: {
          id,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError(
          'An error occurred while finding the user.'
        );
      });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    delete user.password;

    return user;
  }

  public async edit(user: User): Promise<User> {
    if (!user) {
      throw new BadRequestError('You should provide a user.');
    }

    if (!user.id) {
      throw new BadRequestError('You should provide an id.');
    }

    if (!user.name) {
      throw new BadRequestError('You should provide a new name.');
    }

    if (!user.email) {
      throw new BadRequestError('You should provide a new email.');
    }

    if (!user.password) {
      throw new BadRequestError('You should provide a password.');
    }

    const _user = await this.repository
      .findOne({
        where: {
          id: user.id,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('An error occurred while finding user.');
      });

    if (!_user) {
      throw new NotFoundError('User not found.');
    }

    const toUpdate = this.repository.merge(_user, user);

    return this.repository.save(toUpdate).catch(e => {
      logger.err(e.toString());
      throw new InternalServerError('An error ocurred while updating user.');
    });
  }

  public async delete(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestError('You should provide an id.');
    }

    const user = await this.repository
      .findOne({
        where: {
          id,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('An error occurred while finding user.');
      });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return this.repository
      .remove(user)
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('An error occurred while deleting user.');
      })
      .then(() => {
        return;
      });
  }

  public async login({ email, password }: User): Promise<User> {
    if (!email) {
      throw new BadRequestError('You should provide an email.');
    }

    if (!password) {
      throw new BadRequestError('You should provide a password.');
    }

    const user = await this.repository
      .findOne({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('An error occurred while finding user.');
      });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (user.password !== password) {
      throw new BadRequestError('Invalid password.');
    }

    delete user.password;
    return user;
  }
}

export default UserService;
