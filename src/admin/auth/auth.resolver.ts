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
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Tokens } from './dto/tokens.dto';
import { CreateAdminInput } from '../admins/dto/create-admin.input';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
  async loginAdmin(@Args('data') data: LoginInput): Promise<Tokens> {
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

  // @Query(() => Boolean)
  // public async sendEmailForgotPassword(
  //   @Args('email') email: String,
  // ): Promise<Boolean> {
  //   try {
  //     var isEmailSent = await this.authService.sendEmailForgotPassword(email);
  //     if (isEmailSent) {
  //       return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
  //     } else {
  //       return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
  //     }
  //   } catch (error) {
  //     return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
  //   }
  // }
}
