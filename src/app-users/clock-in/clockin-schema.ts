import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Project } from 'src/admin/projects/projects.schema';
import { User } from 'src/admin/users/users.schema';

export const LocationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
  },
});

@ObjectType()
export class Location extends mongoose.Document {
  @Field()
  type: string;

  @Field(() => [Number])
  coordinates: Number[];
}

export const ClockInSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: User },
  time: { type: Date, required: true },
  location: { type: LocationSchema, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: Project },
});

@ObjectType()
export class ClockIn extends mongoose.Document {
  @Field(() => ID)
  id: mongoose.Types.ObjectId;

  @Field(() => Location)
  location: Location;

  @Field()
  time: Date;

  @Field(() => User)
  userID: User;

  @Field(() => Project)
  projectId: Project;
}
