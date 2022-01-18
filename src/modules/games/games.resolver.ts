import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard';
import { IsAdminGuard } from 'src/modules/auth/guards/IsAdminGuard';
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

  @UseGuards(GQLAuthGuard, IsAdminGuard)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameDTO) {
    console.log('aaaaaa');

    return await this.gamesService.create(data);
  }

  @UseGuards(GQLAuthGuard, IsAdminGuard)
  @Mutation(() => Game)
  async updateGame(@Args('id') id: string, @Args('data') data: UpdateGameDTO) {
    return await this.gamesService.update(id, data);
  }

  @UseGuards(GQLAuthGuard, IsAdminGuard)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string) {
    await this.gamesService.delete(id);
    return true;
  }
}
