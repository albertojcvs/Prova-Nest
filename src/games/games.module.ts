import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { Game } from './game.entity';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game]),UsersModule,PermissionsModule],
  providers: [
    GamesResolver,
    GamesService,
  ],
  exports:[GamesService]
})
export class GamesModule {}
