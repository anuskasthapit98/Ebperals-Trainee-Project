import {
  InputType,
  Int,
  Field,
  ID,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/admin/users/dto/user.response';
import { Project } from '../projects.schema';
@ObjectType()
export class ProjectResponse {
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

  @Field(() => [ID])
  users: String[];
}
