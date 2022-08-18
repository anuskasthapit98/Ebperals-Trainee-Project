import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export enum UserType {
  PROJECT_MANAGER = 'project manager',
  NORMAL_STAFF = 'normal staff',
  CLIENT = 'client',
  TRADIES = 'tradies',
}

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  companyName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Number })
  phone: number;

  @Prop({ type: String, enum: Object.values(UserType) })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
