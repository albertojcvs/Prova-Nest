import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/game.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Unique(['user', 'numbers'])
@Entity({ name: 'bets' })
export class Bet {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ nullable: false })
  numbers: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bets  )
  user: User;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.bets, { eager: true })
  game: Game;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
