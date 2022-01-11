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

@Unique(["user","numbers"])
@Entity({ name: 'bets' })
export class Bet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  numbers: string;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;

  @ManyToOne(() => Game, (game) => game.bets)
  game: Game;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
