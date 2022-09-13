import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field(() => String)
  type: string;

  @Field(() => [Number])
  coordinates: Number[];
}

@InputType()
export class CreateClockInInput {
  @Field(() => CreateLocationInput)
  location: CreateLocationInput;

  @Field(() => Date)
  time: Date;

  @Field(() => ID)
  projectId: string;
}
