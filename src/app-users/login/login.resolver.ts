import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../admin/users/dto/user.response';
import { UserAuthService } from './login.service';
import { UserLoginInput } from './dto/create-login.input';
import { CurrentUser } from './decorators/current-user.decorator';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserTokens } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserJwtGuard } from './guards/jwt.guard';

@Resolver(() => User)
export class UserAuthResolver {
  constructor(
    private readonly authService: UserAuthService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  @Mutation(() => UserTokens)
  async loginUser(@Args('data') data: UserLoginInput): Promise<UserTokens> {
    try {
      const tokens = await this.authService.loginUser(data);
      return tokens;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  @Mutation(() => UserTokens)
  async refreshToken(@Args('token') refreshToken: string): Promise<UserTokens> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.config.get<string>('REFRESH_SECRET'),
    });
    return this.authService.refreshTokens(payload.userId, refreshToken);
  }

  @Query(() => User)
  @UseGuards(UserJwtGuard)
  User(@CurrentUser() user: User): User {
    return user;
  }
}
