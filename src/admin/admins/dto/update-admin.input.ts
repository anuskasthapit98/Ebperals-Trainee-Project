import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => ID)
  _id: string;
}
