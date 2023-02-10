import '@Scripts/pre-start';
import Server from '@Core/Server';
import logger from '@Utils/logger';

const server = new Server();

server.start().then(async () => {
  await server.databaseClient
    .setup()
    .then(async () => {
      await server.databaseClient
        .synchronize()
        .then(() => {
          server.configure();
        })
        .catch(e => {
          logger.err(e.toString());
          server.stop(() => {
            logger.err(
              'Server stopped due to an error while attempting to synchronize database'
            );
          });
        });
    })
    .catch(e => {
      logger.err(e.toString());
      server.stop(() => {
        logger.err(
          'Server stopped due to an error while attempting to connect to database'
        );
      });
    });
});
