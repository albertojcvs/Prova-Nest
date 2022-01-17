import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from 'src/modules/carts/carts.module';
import { GamesModule } from 'src/modules/games/games.module';
import { UsersModule } from 'src/modules/users/users.module';
import { Bet } from './bet.entity';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
    CartsModule,
    UsersModule,
    GamesModule,
  ],
  providers: [BetsResolver, BetsService],
})
export class BetsModule {}
