import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from 'src/auth/guards/gqlAuth.guard';
import { IsAdminGuard } from 'src/users/guards/IsAdminGuard';
import { SavePermissionDTO } from './dto/SavePermissionDTO';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Resolver()
@UseGuards(GQLAuthGuard)
@UseGuards(IsAdminGuard)
export class PermissionsResolver {
  constructor(private permissionsService: PermissionsService) {}

  @Query(() => [Permission])
  async permissions() {
    return await this.permissionsService.getAll();
  }

  @Query(() => Permission)
  async permission(@Args('id') id: string) {
    return await this.permissionsService.getOne(id);
  }

  @Mutation(() => Permission)
  async createPermission(@Args('data') data: SavePermissionDTO) {
    return await this.permissionsService.create(data);
  }
  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: string,
    @Args('data') data: SavePermissionDTO,
  ) {
    return await this.permissionsService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deletePermission(@Args('id') id: string) {
    await this.permissionsService.delete(id);
    return true;
  }
}
