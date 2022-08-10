import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  type: string;

  @Field(() => [Number])
  coordinates: Number[];
}

@ObjectType()
export class ClockIn {
  @Field(() => ID)
  _id: string;

  @Field(() => Location)
  location: Location;

  @Field(() => Date)
  time: Date;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  projectId: string;
}
