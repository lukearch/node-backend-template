import Route from '@Interfaces/Route';
import { userRoutes } from './user/routes';

export const routes: Route[] = [...userRoutes].sort(
  (a, b) => a.method.localeCompare(b.method) || a.path.localeCompare(b.path)
);
