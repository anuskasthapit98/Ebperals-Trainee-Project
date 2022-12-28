import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './dto/user.response';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-users.input';
// import { CreateAdminInput } from './dto/create-admin.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.createUser(userInput);
    return user;
  }

  @Mutation(() => User)
  // @UseGuards(JwtGuard)
  async removeUser(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.removeUser(id);
    return user;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = this.usersService.findAll();
    return users;
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput._id, updateUserInput);
  }
}
