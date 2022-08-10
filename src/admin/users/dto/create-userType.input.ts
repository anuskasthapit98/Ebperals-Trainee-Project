import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserTypeInput {
  @Field(()=> String)
  type: string;
}