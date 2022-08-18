import {
  Field,
  HideField,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { UserType } from '../users.schema';

registerEnumType(UserType, { name: 'UserType' });

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String)
  email: string;

  @Field()
  password: string;

  @Field(() => Number)
  phone: number;

  @Field(() => UserType)
  userType: UserType;
}
