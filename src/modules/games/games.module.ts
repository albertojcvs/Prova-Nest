import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { UsersModule } from 'src/modules/users/users.module';
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
