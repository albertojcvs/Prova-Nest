import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './carts.entity';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cart]),PermissionsModule,UsersModule],
  providers: [CartsService, CartsResolver],
  exports: [CartsService]
})
export class CartsModule {}
