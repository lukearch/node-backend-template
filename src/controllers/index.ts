import { container } from 'tsyringe';
import Controller from '@Interfaces/Controller';
import UserController from '@Controllers/UserController';

const controllers = () => {
  return container.resolveAll<Controller>(UserController);
};

export default controllers;
