import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtConstants } from 'src/common/helper/jwtConstants';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }

  // handleRequest(err, user, info, context) {
  //   console.log(user);
  // }
}
