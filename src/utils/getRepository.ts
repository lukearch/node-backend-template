import Server from '@Core/Server';
import { InternalServerError } from 'restify-errors';
import { container, delay } from 'tsyringe';
import { EntityTarget, Repository } from 'typeorm';

const server = container.resolve(delay(() => Server));

export const getRepository = async <T>(
  entity: EntityTarget<T>
): Promise<Repository<T>> => {
  const repository = await server.databaseClient
    .setup()
    .then(_ds => _ds.getRepository<T>(entity))
    .catch(() => {
      throw new InternalServerError(
        'Ocorreu um erro ao entrar em contato com o banco de dados, tente novamente mais tarde'
      );
    });

  return repository;
};
