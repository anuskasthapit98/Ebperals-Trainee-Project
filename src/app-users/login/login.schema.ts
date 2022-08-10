import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Login extends mongoose.Document {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
