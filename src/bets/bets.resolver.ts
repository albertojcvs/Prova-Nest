import { Query, Resolver } from '@nestjs/graphql';
import { Bet } from './bet.entity';

@Resolver()
export class BetsResolver {
    @Query(() => [Bet])
    async bets(){}
}
