import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Context } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userType = this.reflector.get<string[]>(
      'userType',
      context.getHandler(),
    );
    if (!userType) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const hasUserType = () =>
      user.userType.some((userType) => userType.indexOf(userType) > -1);
    let hasPermission = false;

    if (hasUserType()) {
      hasPermission = true;
      if (req.params.email || req.body.email) {
        if (
          req.user.email != req.params.email &&
          req.user.email != req.body.email
        ) {
          hasPermission = false;
        }
      }
    }
  }
}
