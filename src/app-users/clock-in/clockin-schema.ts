import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from 'src/admin/projects/projects.schema';
import { User } from 'src/admin/users/users.schema';

@Schema()
export class Location extends mongoose.Document {
  @Prop({ type: String })
  type: string;

  @Prop({ type: [Number] })
  coordinates: Number[];
}
export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema()
export class ClockIn extends mongoose.Document {
  @Prop({ type: LocationSchema })
  location: Location;

  @Prop({ type: String })
  time: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userID: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projectId: Project;
}

export const ClockInSchema = SchemaFactory.createForClass(ClockIn);
