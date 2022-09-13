import { Module } from '@nestjs/common';
import { UserAuthService } from './login.service';
import { UserAuthResolver } from './login.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from './schemas/login.schema';
import { UsersModule } from 'src/admin/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './strategies/jwt.strategy';
import { UserRefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: LoginSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    UserAuthService,
    UserAuthResolver,
    UserJwtStrategy,
    UserRefreshTokenStrategy,
  ],
})
export class LoginModule {}
