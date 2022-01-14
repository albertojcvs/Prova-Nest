import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { genSalt, hash } from 'bcrypt';
import { Bet } from 'src/bets/bet.entity';
import { Permission } from 'src/permissions/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field()
  @Column({ unique: true, nullable: false })
  email: string;

  @HideField()
  @Column({ nullable: false })
  password: string;

  @Field(() => [Permission])
  @ManyToMany(() => Permission)
  @JoinTable({ name: 'user_permissions' })
  permissions: Permission[];

  @Field(() => [Bet])
  @OneToMany(() => Bet, (bet) => bet.user, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  bets: Bet[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    this.password = await hash(this.password, salt);
  }
}
