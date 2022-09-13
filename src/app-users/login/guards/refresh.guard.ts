import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserRefreshJwtGuard extends AuthGuard('jwt-user-refresh') {
  constructor() {
    super();
  }
}
