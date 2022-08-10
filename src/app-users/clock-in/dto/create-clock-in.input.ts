import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClockInInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
