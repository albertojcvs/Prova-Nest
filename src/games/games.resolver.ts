import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGameDTO } from './dto/CreateGameDTO';
import { UpdateGameDTO } from './dto/UpdateGameDTO';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Resolver()
export class GamesResolver {
  constructor(private gamesService: GamesService) {}
  @Query(() => [Game])
  async games() {
    return await this.gamesService.getAll();
  }

  @Query(() => Game)
  async game(@Args('id') id: string) {
    return await this.gamesService.getOne(id);
  }

  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameDTO) {
    return await this.gamesService.create(data);
  }

  @Mutation(() => Game)
  async updateGame(@Args('id') id: string, @Args('data') data: UpdateGameDTO) {
    return await this.gamesService.update(id, data);
  }
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string) {
    await this.gamesService.delete(id);
    return true;
  }
}
