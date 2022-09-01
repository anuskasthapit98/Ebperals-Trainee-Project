import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../admin/users/dto/user.response';
import { AuthService } from './login.service';
import { LoginInput } from './dto/create-login.input';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';


@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args('loginData') loginData: LoginInput): Promise<string> {
    return this.authService.login(loginData);
  }

  @Query(() => User)
  
  me(@CurrentUser() user: User): User {
    return user;
  }
}
