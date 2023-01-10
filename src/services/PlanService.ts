import { Service } from '@Classes/Service';
import Plan from '@Database/entities/Plan';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'restify-errors';
import logger from 'jet-logger';
import { injectable } from 'tsyringe';

@injectable()
class PlanService extends Service<Plan> {
  constructor() {
    super();
    this.setup(Plan).then();
  }

  public async save(plan: Plan): Promise<Plan> {
    if (!plan) {
      throw new BadRequestError('É necessário informar um plano.');
    }

    if (!plan.name) {
      throw new BadRequestError('É necessário informar o nome do plano.');
    }

    if (!plan.price) {
      throw new BadRequestError('É necessário informar o preço do plano.');
    }

    if (!plan.duration && plan.duration !== 0) {
      throw new BadRequestError('É necessário informar a duração do plano.');
    }

    const _plan = this.repository.create(plan);

    return this.repository.save(_plan).catch(e => {
      logger.err(e.toString());
      throw new InternalServerError('Erro ao salvar plano.');
    });
  }

  public async list(queryOptions?: {
    limit?: number;
    offset?: number;
    page?: number;
    duration?: number;
  }): Promise<{
    data: Plan[];
    total: number;
    limit: number;
    offset: number;
    page: number;
  }> {
    const { limit, offset, page, duration } = queryOptions;

    const _limit = limit ? Number(limit) : 10;
    let _offset = offset ? Number(offset) : 0;
    const _page = page ? Number(page) : 1;
    const _duration = duration ? Number(duration) : 0;

    if (_offset === 0 && page) {
      _offset = (_page - 1) * _limit;
    }

    return this.repository
      .findAndCount({
        order: {
          position: 'DESC',
        },
        where: {
          ...(duration && { duration: _duration }),
        },
        take: _limit,
        skip: _offset,
      })
      .catch(err => {
        logger.err(err);
        throw new InternalServerError('Erro ao buscar planos.');
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

  public async findOne(id: string): Promise<Plan> {
    if (!id) {
      throw new BadRequestError('É necessário informar o id do plano.');
    }

    const plan = await this.repository
      .findOne({
        where: {
          id,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('Erro ao buscar plano.');
      });

    if (!plan) {
      throw new NotFoundError('Plano não encontrado.');
    }

    return plan;
  }

  public async edit(plan: Plan): Promise<Plan> {
    if (!plan) {
      throw new BadRequestError('É necessário informar um plano.');
    }

    if (!plan.id) {
      throw new BadRequestError('É necessário informar o id do plano.');
    }

    if (!plan.name) {
      throw new BadRequestError('É necessário informar o novo nome do plano.');
    }

    if (!plan.price) {
      throw new BadRequestError('É necessário informar o novo preço do plano.');
    }

    if (!plan.duration && plan.duration !== 0) {
      throw new BadRequestError(
        'É necessário informar a nova duração do plano.'
      );
    }

    const _plan = await this.repository
      .findOne({
        where: {
          id: plan.id,
        },
      })
      .catch(e => {
        logger.err(e.toString());
        throw new InternalServerError('Erro ao buscar plano.');
      });

    if (!_plan) {
      throw new NotFoundError('Plano não encontrado.');
    }

    const toUpdate = this.repository.merge(_plan, plan);

    return this.repository.save(toUpdate).catch(e => {
      logger.err(e.toString());
      throw new InternalServerError('Erro ao salvar plano.');
    });
  }
}

export default PlanService;
