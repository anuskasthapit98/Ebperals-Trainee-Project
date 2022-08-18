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

  @Field()
  password: string;
}
