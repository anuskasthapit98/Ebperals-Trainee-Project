import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { Login } from './login.schema';
import { CreateLoginInput } from './dto/create-login.input';

@Resolver(() => Login)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => Login)
  createLogin(@Args('CreateLoginInput') CreateLoginInput: CreateLoginInput) {
    return this.loginService.create(CreateLoginInput);
  }

}
