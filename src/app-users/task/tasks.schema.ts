import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from '../../admin/projects/projects.schema';
import { User } from '../../admin/users/users.schema';

@Schema()
export class Task extends mongoose.Document {
  @Prop({ type: String })
  taskName: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
