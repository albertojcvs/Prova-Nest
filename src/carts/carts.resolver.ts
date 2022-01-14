import { Query, Resolver } from '@nestjs/graphql';
import { Cart } from './carts.entity';

@Resolver()
export class CartsResolver {
  @Query(() => [Cart])
  async carts() {}

  @Query(() => Cart)
  async cart() {}
}
