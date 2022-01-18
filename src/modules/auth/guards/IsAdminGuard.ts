import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const user:User = ctx.getContext().req.user;

    const hasAdminPermission = user.permissions.some(
      (permission) => permission.name == 'admin',
    );

    if (hasAdminPermission) return true;

    throw new ForbiddenException('Only Admins can acess this route');
  }
}
