import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './carts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart])],
  providers: [CartsService, CartsResolver]
})
export class CartsModule {}
