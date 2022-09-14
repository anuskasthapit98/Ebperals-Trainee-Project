import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from 'src/admin/users/users.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserType = this.reflector.getAllAndOverride<UserType[]>(
      'userTypes',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredUserType) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    return requiredUserType.some((userType) =>
      user?.userType?.includes(userType),
    );
  }
}
