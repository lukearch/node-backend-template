import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export default class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @BeforeUpdate()
  public updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  public updateUserInfo() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.id = crypto.randomUUID();
  }

  public toString() {
    return `User: ${this.name} - ${this.email}`;
  }
}
