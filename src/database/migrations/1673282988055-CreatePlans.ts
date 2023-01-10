import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import logger from 'jet-logger';
import Plan from '@Database/entities/Plan';

export class CreatePlans1673282988055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createDatabase('mv-shop-server-development', true)
      .catch(err => {
        logger.err(err.toString());
      });
    await queryRunner
      .createTable(
        new Table({
          name: 'plans',
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
              isUnique: true,
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'mainColor',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'float',
            },
            {
              name: 'discount',
              type: 'float',
              isNullable: true,
            },
            {
              name: 'duration',
              type: 'integer',
              isNullable: true,
            },
            {
              name: 'benefits',
              type: 'json',
            },
            {
              name: 'position',
              type: 'integer',
              isGenerated: true,
              generationStrategy: 'increment',
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

    const plans = [
      {
        name: 'Básico 1 Mês',
        price: 109.9,
        duration: 1,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: false,
          invoices: false,
          directDebit: false,
          amountOfPersonalizedProjects: 25,
          amountOfAccessProfiles: 1,
          amountOfDevices: 2,
        },
      },
      {
        name: 'Premium 1 Mês',
        price: 219.9,
        duration: 1,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: false,
          directDebit: false,
          amountOfPersonalizedProjects: 35,
          amountOfAccessProfiles: 3,
          amountOfDevices: 4,
        },
      },
      {
        name: 'Premium Pro+ 1 Mês',
        price: 249.9,
        duration: 1,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: true,
          directDebit: false,
          amountOfPersonalizedProjects: 50,
          amountOfAccessProfiles: 5,
          amountOfDevices: 6,
        },
      },
      {
        name: 'Básico 3 Meses',
        price: 109.9,
        duration: 3,
        discount: 16,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: false,
          invoices: false,
          directDebit: true,
          amountOfPersonalizedProjects: 25,
          amountOfAccessProfiles: 1,
          amountOfDevices: 2,
        },
      },
      {
        name: 'Premium 3 Meses',
        price: 219.9,
        duration: 3,
        discount: 20,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: false,
          directDebit: false,
          amountOfPersonalizedProjects: 35,
          amountOfAccessProfiles: 3,
          amountOfDevices: 4,
        },
      },
      {
        name: 'Premium Pro+ 3 Meses',
        price: 249.9,
        duration: 3,
        discount: 11,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: true,
          directDebit: false,
          amountOfPersonalizedProjects: 50,
          amountOfAccessProfiles: 5,
          amountOfDevices: 6,
        },
      },
      {
        name: 'Básico 6 Meses',
        price: 109.9,
        duration: 6,
        discount: 16,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: false,
          invoices: false,
          directDebit: true,
          amountOfPersonalizedProjects: 25,
          amountOfAccessProfiles: 1,
          amountOfDevices: 2,
        },
      },
      {
        name: 'Premium 6 Meses',
        price: 219.9,
        duration: 6,
        discount: 20,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: false,
          directDebit: false,
          amountOfPersonalizedProjects: 35,
          amountOfAccessProfiles: 3,
          amountOfDevices: 4,
        },
      },
      {
        name: 'Premium Pro+ 6 Meses',
        price: 249.9,
        duration: 6,
        discount: 11,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: true,
          directDebit: false,
          amountOfPersonalizedProjects: 50,
          amountOfAccessProfiles: 5,
          amountOfDevices: 6,
        },
      },
      {
        name: 'Básico 12 Meses',
        price: 109.9,
        duration: 12,
        discount: 16,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: false,
          invoices: false,
          directDebit: true,
          amountOfPersonalizedProjects: 25,
          amountOfAccessProfiles: 1,
          amountOfDevices: 2,
        },
      },
      {
        name: 'Premium 12 Meses',
        price: 219.9,
        duration: 12,
        discount: 20,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: false,
          directDebit: false,
          amountOfPersonalizedProjects: 35,
          amountOfAccessProfiles: 3,
          amountOfDevices: 4,
        },
      },
      {
        name: 'Premium Pro+ 12 Meses',
        price: 249.9,
        duration: 12,
        discount: 11,
        description: 'Ganhe 2 meses grátis',
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: true,
          directDebit: false,
          amountOfPersonalizedProjects: 50,
          amountOfAccessProfiles: 5,
          amountOfDevices: 6,
        },
      },
      {
        name: 'Assinatura Básica',
        price: 109.9,
        duration: 0,
        discount: 14,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: false,
          invoices: false,
          directDebit: true,
          amountOfPersonalizedProjects: 25,
          amountOfAccessProfiles: 1,
          amountOfDevices: 2,
        },
      },
      {
        name: 'Assinatura Premium',
        price: 219.9,
        duration: 0,
        discount: 14,
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: false,
          directDebit: true,
          amountOfPersonalizedProjects: 35,
          amountOfAccessProfiles: 3,
          amountOfDevices: 4,
        },
      },
      {
        name: 'Assinatura Premium Pro+',
        price: 249.9,
        duration: 0,
        discount: 20,
        description: 'Economize 20%',
        benefits: {
          unlimitedBudgets: true,
          advancedBudgets: true,
          temperedGlassProjects: true,
          esquadriaProjects: true,
          invoices: true,
          directDebit: false,
          amountOfPersonalizedProjects: 50,
          amountOfAccessProfiles: 5,
          amountOfDevices: 6,
        },
      },
    ] as Plan[];

    await Promise.all(
      plans.map(async plan => {
        const planExists = await queryRunner.manager
          .findOne(Plan, {
            where: {
              name: plan.name,
            },
          })
          .catch(err => {
            logger.err(err.toString());
          });

        if (planExists) {
          return;
        }

        const toSave = queryRunner.manager.create(Plan, plan);

        await queryRunner.manager.save(toSave).catch(err => {
          logger.err(err.toString());
        });
      })
    ).then(() => {
      logger.info('Plans created');
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .dropTable('plans')
      .catch(err => {
        logger.err(err.toString());
      })
      .then(() => {
        logger.info('Table plans dropped');
      });
  }
}
