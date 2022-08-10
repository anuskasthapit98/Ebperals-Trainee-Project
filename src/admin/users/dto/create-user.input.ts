import { Field, InputType } from '@nestjs/graphql';
import { UserTypeSchema } from '../users.schema';
import { UserType } from './user.response';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Number)
  phone: number;

  @Field(() => UserTypeSchema)
  userType: UserType;
}
