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
import { AdminLoginInput } from './dto/create-login.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Tokens } from './dto/tokens.dto';
import { CreateAdminInput } from '../admins/dto/create-admin.input';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CurrentAdmin } from './decorators/current-admin.decorator';

@Resolver(() => Admin)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  @Mutation(() => Tokens)
  async addAdmin(@Args('data') data: CreateAdminInput): Promise<Tokens> {
    try {
      const tokens = await this.authService.addAdmin(data);
      return tokens;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  @Mutation(() => Tokens)
  async loginAdmin(@Args('data') data: AdminLoginInput): Promise<Tokens> {
    try {
      const tokens = await this.authService.loginAdmin(data);
      return tokens;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  @Mutation(() => Tokens)
  async refreshToken(@Args('token') refreshToken: string): Promise<Tokens> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.config.get<string>('REFRESH_SECRET'),
    });
    return this.authService.refreshTokens(payload.adminId, refreshToken);
  }

  @Query(() => Admin)
  me(@CurrentAdmin() admin: Admin): Admin {
    return admin;
  }


}
