import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from './login.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: LoginSchema }])],

  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
