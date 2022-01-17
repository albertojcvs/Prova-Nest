import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { BetsModule } from '../bets/bets.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { GamesModule } from '../games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LoginModule } from 'src/modules/login/login.module';
import { AuthModule } from 'src/modules/auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => req,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    BetsModule,
    PermissionsModule,
    GamesModule,
    AuthModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
