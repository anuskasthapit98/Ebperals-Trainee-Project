import { InputType, Int, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  taskName: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  projectId: string;
}
