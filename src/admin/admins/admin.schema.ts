import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Admin extends mongoose.Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  refreshToken: string;

  @Prop({ type: String })
  otp: string;

  @Prop({ type: String })
  otpCreatedAt: string;

  @Prop({ type: String })
  token: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
