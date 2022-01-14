import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/permission.entity';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission]),],
  providers: [UsersResolver, UsersService],
  exports:[UsersService]
})
export class UsersModule {}
