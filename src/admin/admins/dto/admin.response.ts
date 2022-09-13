import {
  Field,
  HideField,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @HideField()
  password: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  token?: String;

  @Field(() => String)
  otp?: String;

  @Field(() => String)
  otpCreatedAt?: String;
}
