import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as crypto from 'crypto';

@Entity({
  name: 'plans',
})
class Plan {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column({
    nullable: true,
  })
  public description: string;

  @Column({
    nullable: true,
  })
  public mainColor: string;

  @Column({
    type: 'float',
  })
  public price: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  public discount: number;

  @Column({
    nullable: true,
  })
  public duration: number;

  @Column({
    type: 'json',
  })
  public benefits: {
    unlimitedBudgets: boolean;
    advancedBudgets: boolean;
    temperedGlassProjects: boolean;
    esquadriaProjects: boolean;
    invoices: boolean;
    directDebit: boolean;
    amountOfPersonalizedProjects: number;
    amountOfAccessProfiles: number;
    amountOfDevices: number;
  };

  @Column({
    generated: 'increment',
  })
  public position: number;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  updateBenefits() {
    const memo = this.benefits;

    this.benefits = {
      unlimitedBudgets: memo.unlimitedBudgets || false,
      advancedBudgets: memo.advancedBudgets || false,
      temperedGlassProjects: memo.temperedGlassProjects || false,
      esquadriaProjects: memo.esquadriaProjects || false,
      invoices: memo.invoices || false,
      directDebit: memo.directDebit || false,
      amountOfPersonalizedProjects: memo.amountOfPersonalizedProjects || 0,
      amountOfAccessProfiles: memo.amountOfAccessProfiles || 0,
      amountOfDevices: memo.amountOfDevices || 0,
    };
  }

  @BeforeInsert()
  onInit() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default Plan;
