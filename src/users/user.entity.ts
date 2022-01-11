import {} from '@nestjs/graphql';
import { Bet } from 'src/bets/bet.entity';
import { Permission } from 'src/permissions/permission.entity';
import { DetailedPeerCertificate } from 'tls';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'user_permissions' })
  permissions: Permission[];

  @OneToMany(() => Bet, (bet) => bet.user, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  bets: Bet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
