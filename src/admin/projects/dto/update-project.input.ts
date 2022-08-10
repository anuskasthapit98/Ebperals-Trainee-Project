import { CreateProjectInput } from './create-project.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => String)
  _id: String;
}
