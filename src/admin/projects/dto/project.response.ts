import { InputType, Int, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/admin/users/dto/user.response';

@ObjectType()
export class Project {
  @Field(() => ID)
  _id: string;

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
