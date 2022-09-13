import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AdminOtpInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  otp: string;
}
