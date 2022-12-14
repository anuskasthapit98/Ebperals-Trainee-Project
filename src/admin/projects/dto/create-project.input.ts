import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateUserInput } from 'src/admin/users/dto/create-user.input';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  projectName: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => [ID])
  users: string[];
}
