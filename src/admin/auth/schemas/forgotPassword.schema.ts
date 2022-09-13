import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ForgotPassword extends mongoose.Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String, default: 'H@l0Password' })
  emailToken: string;

  @Prop({ type: Date })
  timestamp: Date;
}

export const ForgottenPasswordSchema =
  SchemaFactory.createForClass(ForgotPassword);
