import { Field, HideField, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field()
  password: string;

}
