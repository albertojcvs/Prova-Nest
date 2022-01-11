import { Bet } from 'src/bets/bet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  range: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  maxNumber: number;

  @OneToMany(() => Bet, (bet) => bet.game)
  bets: Bet[];
}
