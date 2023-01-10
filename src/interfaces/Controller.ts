import Route from './Route';
import Server from '@Core/Server';

interface Controller {
  routes: Route[];
  register(server: Server): void;
}

export default Controller;
