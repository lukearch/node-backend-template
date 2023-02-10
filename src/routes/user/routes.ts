import Route from '@Interfaces/Route';
import { getUser, listAllUsers, saveUser } from './1.1.0';

export const userRoutes: Route[] = [
  {
    method: 'get',
    path: '/users',
    versions: [
      {
        version: '1.1.0',
        handler: listAllUsers.bind(this),
        middlewares: [],
      },
    ],
  },
  {
    method: 'get',
    path: '/users/:id',
    versions: [
      {
        version: '1.1.0',
        handler: getUser.bind(this),
        middlewares: [],
      },
    ],
  },
  {
    method: 'post',
    path: '/users',
    versions: [
      {
        version: '1.1.0',
        handler: saveUser.bind(this),
        middlewares: [],
      },
    ],
  },
];
