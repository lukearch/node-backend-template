import PlanController from '@Controllers/PlanController';
import { container } from 'tsyringe';
import Controller from '@Interfaces/Controller';

const controllers = () => {
  return container.resolveAll<Controller>(PlanController);
};

export default controllers;
