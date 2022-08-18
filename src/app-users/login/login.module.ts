import { Module } from '@nestjs/common';
import { AuthService } from './login.service';
import { AuthResolver } from './login.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from './login.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: LoginSchema }])],
  providers: [AuthService, AuthResolver],
})
export class LoginModule {}
