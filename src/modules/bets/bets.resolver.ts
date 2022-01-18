import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard';
import { CurrentUser } from '../auth/decorators/CurrentUser';
import { User } from '../users/user.entity';
import { Bet } from './bet.entity';
import { BetsService } from './bets.service';
import { CreateBetDTO } from './dto/CreateBetDto';

@Resolver()
@UseGuards(GQLAuthGuard)
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

  @Mutation(() => [Bet])
  async createBet(@Args('data') data: CreateBetDTO, @CurrentUser() user: User) {
    return await this.betsService.create(data, user);
  }

  @Mutation(() => Boolean)
  async deleteBet(@Args('id') id: string) {
    await this.betsService.delete(id);
    return true;
  }
}
