import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { jwtConstants } from 'src/common/helper/jwtConstants';

@Injectable()
export class UserRefreshJwtGuard extends AuthGuard(jwtConstants.Refresh) {
  constructor() {
    super();
  }
}
