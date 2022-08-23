import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Admin } from '../admins/dto/admin.response';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/create-login.input';
import { CurrentUser } from './decorators/current-user.decorator';
import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { Tokens } from './dto/tokens.dto';
import { CreateAdminInput } from '../admins/dto/create-admin.input';
import { AdminService } from '../admins/admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from 'src/common/helper/jwtConstants';
@Resolver(() => Admin)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => Tokens)
  async loginUser(@Args('data') data: LoginInput): Promise<Tokens> {
    try {
      const tokens = await this.authService.loginUser(data);
      return tokens;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  @Mutation(() => Tokens)
  async refreshToken(@Args('token') refreshToken: string): Promise<Tokens> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.secret,
    });

    const user = await this.adminService.findOneByEmail(payload.email);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Unauthorized: Access Denied');

    const refreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatch)
      throw new ForbiddenException('Unauthorized: Access Denied');
    try {
      const tokens = await this.authService.refreshToken(payload.email);
      if (tokens) return tokens;
    } catch (err) {
      throw new InternalServerErrorException('Error in login');
    }
  }
}
