import { DataSource } from 'typeorm';
import { AppDataSource } from '@Database/data-source';
import logger from '@Utils/logger';

class DatabaseClient {
  private static dataSource: DataSource;

  public async setup(): Promise<DataSource> {
    if (DatabaseClient.dataSource) {
      return DatabaseClient.dataSource;
    }

    return AppDataSource.initialize().then(dataSource => {
      logger.info('Database connected with success');
      DatabaseClient.dataSource = dataSource;
      return DatabaseClient.dataSource;
    });
  }

  public async synchronize(callback?: () => void): Promise<void> {
    return DatabaseClient.dataSource.synchronize().then(() => {
      logger.info('Database synchronized with success');

      if (callback) callback();
    });
  }

  public async close(callback?: () => void): Promise<void> {
    return DatabaseClient.dataSource.destroy().then(() => {
      logger.info('Connection closed with success');

      if (callback) callback();
    });
  }
}

export default DatabaseClient;
