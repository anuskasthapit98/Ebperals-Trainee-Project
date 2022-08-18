import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';

@Schema()
export class Project extends mongoose.Document {
  @Prop({ type: String })
  projectName: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
