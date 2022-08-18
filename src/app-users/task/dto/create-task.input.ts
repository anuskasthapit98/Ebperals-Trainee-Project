import { InputType, Int, Field, ID } from '@nestjs/graphql';
import mongoose from 'mongoose';

@InputType()
export class CreateTaskInput {
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
}
