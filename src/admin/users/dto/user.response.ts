import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserTypeSchema } from '../users.schema';

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  type: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

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

  @Field(() => Int)
  phone: number;

  @Field(() => UserTypeSchema)
  userType: UserType;
}
