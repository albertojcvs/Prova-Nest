import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  providers: [BetsResolver, BetsService],
})
export class BetsModule {}
