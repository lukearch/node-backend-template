import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import logger from 'jet-logger';
import User from '@Database/entities/User';

export class CreateUser1673381408311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              isUnique: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
            },
          ],
        }),
        true
      )
      .catch(err => {
        logger.err(err.toString());
      });

    const user = new User();
    user.name = 'Lucas Larangeira';
    user.email = 'lukearch@beblitz.com.br';
    user.password = '123456';

    const toSave = queryRunner.manager.create(User, user);

    await queryRunner.manager.save(toSave).then(user => {
      logger.info(user.toString());
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
