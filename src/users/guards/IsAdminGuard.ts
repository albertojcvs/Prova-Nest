import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UsersService } from '../users.service';

@Injectable()
export class IsAdminGuard {
  constructor(
    private usersService: UsersService,
    @Inject(forwardRef(() => PermissionsService))private permissionsService: PermissionsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const user = await this.usersService.getOne(ctx.getContext().req.user.id);
    const adminPermission = await this.permissionsService.getOneBy(
      'name',
      'admin',
    );

    const hasAdminPermission = user.permissions.some(
      (permission) => permission.id === adminPermission.id,
    );
    if (hasAdminPermission) return true;

    throw new ForbiddenException('Only Admins can acess this route');
  }
}
