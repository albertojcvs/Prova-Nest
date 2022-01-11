import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SaveUserDTO } from './dto/SaveUserDTO';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query(() => [User])
  async users() {
    return await this.usersService.getAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return await this.usersService.getOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: SaveUserDTO) {
    return await this.usersService.create(data);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('data') data: SaveUserDTO) {
    return await this.usersService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    await this.usersService.delete(id);

    return true;
  }
}
