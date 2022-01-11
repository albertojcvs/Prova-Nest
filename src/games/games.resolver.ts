import { Query, Resolver } from '@nestjs/graphql';
import { Bet } from 'src/bets/bet.entity';

@Resolver()
export class GamesResolver {
  @Query(() => [Bet])
  async games() {}
}
