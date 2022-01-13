import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameDTO } from 'src/games/dto/CreateGameDTO';
import { Bet } from './bet.entity';
import { BetsService } from './bets.service';

@Resolver()
export class BetsResolver {
  constructor(private betsService: BetsService) {}

  @Query(() => [Bet])
  async bets() {
    return await this.betsService.getAll();
  }

  @Query(() => Bet)
  async bet(@Args('id') id: string) {
    return await this.betsService.getOne(id);
  }

  @Mutation(() => Bet)
  async createBet(@Args('data') data: CreateGameDTO) {
    return await this.betsService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteBet(@Args('id') id: string) {
    await this.betsService.delete(id);
    return true;
  }
}
