import { inject, injectable } from 'tsyringe';
import Controller from '@Interfaces/Controller';
import Route from '@Interfaces/Route';
import { IRequest } from '@Interfaces/IRequest';
import { Response } from 'restify';
import { HttpStatusCode } from 'axios';
import AppResponse from '@Classes/AppResponse';
import PlanService from '@Services/PlanService';
import Server from '@Core/Server';
import Plan from '@Database/entities/Plan';

@injectable()
class PlanController implements Controller {
  constructor(@inject(PlanService) private service: PlanService) {
    this.service = service;
  }

  get routes(): Route[] {
    return [
      {
        path: '/plans',
        method: 'get',
        handler: this.list.bind(this),
        middlewares: [],
      },
      {
        path: '/plans/:id',
        method: 'get',
        handler: this.findOne.bind(this),
        middlewares: [],
      },
      {
        path: '/plans',
        method: 'post',
        handler: this.create.bind(this),
        middlewares: [],
      },
      {
        path: '/plans',
        method: 'put',
        handler: this.update.bind(this),
        middlewares: [],
      },
    ];
  }

  public register(server: Server): void {
    this.routes.forEach(route => {
      server.registerRoute(route);
    });
  }

  public async list(
    req: IRequest<
      void,
      void,
      {
        limit?: number;
        offset?: number;
        page?: number;
        duration?: number;
      }
    >,
    res: Response
  ): Promise<void> {
    await this.service.list(req.query).then(data => {
      res.send(
        HttpStatusCode.Ok,
        new AppResponse(
          data.data,
          data.limit,
          data.offset,
          data.page,
          Math.ceil(data.total / data.limit),
          data.data.length,
          data.total
        )
      );
    });
  }

  public async findOne(
    req: IRequest<void, { id: string }>,
    res: Response
  ): Promise<void> {
    res.send(
      HttpStatusCode.Ok,
      new AppResponse(await this.service.findOne(req.params.id))
    );
  }

  public async create(req: IRequest<Plan>, res: Response): Promise<void> {
    res.send(
      HttpStatusCode.Created,
      new AppResponse(await this.service.save(req.body))
    );
  }

  public async update(req: IRequest<Plan>, res: Response): Promise<void> {
    res.send(
      HttpStatusCode.Ok,
      new AppResponse(await this.service.edit(req.body))
    );
  }
}

export default PlanController;
