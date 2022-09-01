import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AdminModule } from '../admins/admin.module';
import { AuthResolver } from './auth.resolver';
import { AdminSchema } from '../admins/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ForgottenPasswordSchema } from './schemas/forgotPassword.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    AdminModule,
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'ForgottenPassword', schema: ForgottenPasswordSchema },
    ]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
