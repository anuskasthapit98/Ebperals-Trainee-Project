import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserType } from '../users.schema';

registerEnumType(UserType, { name: 'UserType' });

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

  @Field(() => UserType)
  userType: UserType;
}
