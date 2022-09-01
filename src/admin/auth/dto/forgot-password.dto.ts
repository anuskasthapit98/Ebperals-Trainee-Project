import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForgotPassword {
  @Field(() => String)
  email: string;

  @Field(() => String)
  newPasswordToken: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  UpdatedAt: Date;
}
