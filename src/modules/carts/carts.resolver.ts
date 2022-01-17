import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from 'src/modules/auth/guards/gqlAuth.guard';
import { IsAdminGuard } from 'src/modules/users/guards/IsAdminGuard';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';
import { CreateCartDTO } from './dto/CreateCartDTO';

@Resolver()
export class CartsResolver {
  constructor(private cartsService: CartsService) {}

  @UseGuards(IsAdminGuard)
  @Query(() => [Cart])
  async carts() {
    return await this.cartsService.getAll();
  }

  @Query(() => Cart)
  async cart(@Args('id') id: string) {
    return await this.cartsService.getOne(id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Cart)
  async createCart(@Args('data') data: CreateCartDTO) {
    return await this.cartsService.create(data);
  }

  @UseGuards(IsAdminGuard)
  @Mutation(() => String)
  async deleteCart(@Args('id') id: string) {
    await this.cartsService.delete(id);
    return 'Cart deleted!';
  }
}
