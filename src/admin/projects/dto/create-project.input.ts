import { InputType, Int, Field, ID } from'@nestjs/graphql';
import { User } from 'src/admin/users/dto/user.response';

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

  @Field(() => [User])
  users: User[];
}
