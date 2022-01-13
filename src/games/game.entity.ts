import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Bet } from 'src/bets/bet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'games' })
export class Game {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ nullable: false, unique: true })
  type: string;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column({ nullable: false })
  range: number;

  @Field()
  @Column({ nullable: false })
  price: number;

  @Field()
  @Column({ nullable: false })
  color: string;

  @Field()
  @Column({ nullable: false })
  maxNumber: number;

  @Field(() => [Bet])
  @OneToMany(() => Bet, (bet) => bet.game)
  bets: Bet[];
}
