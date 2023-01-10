import { EntityTarget, Repository } from 'typeorm';
import Server from '@Core/Server';
import { container } from 'tsyringe';
import logger from 'jet-logger';
import { InternalServerError } from 'restify-errors';

export class Service<T> {
  protected repository: Repository<T>;

  public async setup(target: EntityTarget<T>): Promise<void> {
    this.repository = await container
      .resolve(Server)
      .databaseClient.setup()
      .then(dataSource => {
        return dataSource.getRepository<T>(target);
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError(
          'An error occurred while connecting to the database.'
        );
      });
  }
}
