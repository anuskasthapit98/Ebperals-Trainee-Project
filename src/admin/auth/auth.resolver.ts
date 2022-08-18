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
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';

@Resolver(() => Admin)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('loginData') loginData: LoginInput): Promise<string> {
    return this.authService.login(loginData);
  }

  @Query(() => Admin)
  @UseGuards(JwtGuard)
  me(@CurrentUser() user: Admin): Admin {
    return user;
  }
}
