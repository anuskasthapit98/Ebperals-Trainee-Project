import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResetPassword {
  @Field(() => String)
  email: string;

  @Field(() => String)
  newPasswordToken: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  confirmPassword: string;
}
