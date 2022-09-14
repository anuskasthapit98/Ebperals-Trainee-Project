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
import { JwtGuard } from './guards/jwt.guard';
import { ChangePasswordStatus } from './dto/change-password-status.dto';
import { ChangePasswordInput } from './dto/change-password.input';
import { ResetPasswordToken } from './dto/reset-password-token.dto';
import { ForgetPasswordTokens } from './dto/forgot-password-token.dto';
import { AdminOtpInput } from './dto/otp-input';
import { GenerateOtp } from './dto/generate-otp.dto';

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

  // @UseGuards(JwtGuard)
  // @Mutation(() => ChangePasswordStatus)
  // async changePassword(
  //   @Args('data') data: ChangePasswordInput,
  // ): Promise<ChangePasswordStatus> {
  //   try {
  //     const changePassword = await this.authService.changePassword(data);
  //     return { status: changePassword.status };
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  // }

  // @Mutation(() => ResetPasswordToken)
  // async resetPassword(
  //   @Args('data') data: AdminLoginInput,
  // ): Promise<ResetPasswordToken> {
  //   try {
  //     const token = await this.authService.resetPassword(data);
  //     return { token: token.token };
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  // }

  // @Mutation(() => ForgetPasswordTokens)
  // async forgetPassword(
  //   @Args('data') data: AdminOtpInput,
  // ): Promise<ForgetPasswordTokens> {
  //   try {
  //     const tokens = await this.authService.forgetPassword(data);
  //     return tokens;
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  // }

  // @Mutation(() => GenerateOtp)
  // async generateOtp(@Args('data') email: string): Promise<GenerateOtp> {
  //   try {
  //     const otp = await this.authService.generateOtp(email);
  //     return { otp: otp.otp };
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  // }
}
